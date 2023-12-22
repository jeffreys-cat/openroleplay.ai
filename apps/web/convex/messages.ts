import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";
import { getUser } from "./users";

export const list = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    await getUser(ctx);
    return await ctx.db
      .query("messages")
      .withIndex("byChatId", (q) => q.eq("chatId", args.chatId))
      .collect();
  },
});

export const send = mutation({
  args: {
    message: v.string(),
    chatId: v.id("chats"),
    characterId: v.id("characters"),
    personaId: v.optional(v.id("personas")),
  },
  handler: async (ctx, { message, chatId, characterId, personaId }) => {
    const user = await getUser(ctx);
    await ctx.db.insert("messages", {
      text: message,
      chatId,
      personaId,
    });
    await ctx.scheduler.runAfter(0, internal.serve.answer, {
      chatId,
      characterId,
      personaId,
      userId: user._id,
    });
  },
});

export const clear = mutation({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    await getUser(ctx);
    const messages = await ctx.db
      .query("messages")
      .withIndex("byChatId", (q) => q.eq("chatId", args.chatId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});
