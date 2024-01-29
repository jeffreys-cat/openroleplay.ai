import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogPortal,
} from "@repo/ui/src/components/dialog";
import { usePaymentDialog } from "../lib/hooks/use-crystal-dialog";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const stripeKey =
  process.env.NODE_ENV === "development"
    ? "pk_test_51OJquFDWbs4J5X5ckbKjSEpcjrgOYTsHxRiOq1frxbahPFDtt0perqP7cWLl8FTUIQ0aVP7dMugvauRxpbT54Wjo004FuhU1Ug"
    : "pk_live_51OJquFDWbs4J5X5c73h8TpqpRHY5OVpGBiWqia7DkkYMUUAf8yZ5upuDhEK2LRXcFe8qCrlzNLPmkJr0AKVtXn7600AVe2lUmZ";

const stripePromise = loadStripe(stripeKey);

const CrystalDialog: React.FC = () => {
  const { isOpen, clientSecret, closeDialog } = usePaymentDialog();
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  useEffect(() => {
    if (sessionId) {
      toast.success(`Payment processed successfully.`);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [sessionId]);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogContent
          className="max-h-96 min-w-fit overflow-y-scroll bg-white p-8 lg:max-h-[48rem]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CrystalDialog;