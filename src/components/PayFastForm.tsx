import React from "react";

// PayFast "Pay Now" settings (receiver = merchant ID)
export const PAYFAST_ACTION = "https://payment.payfast.io/eng/process";
export const PAYFAST_RECEIVER = "35859069";
export const PAYFAST_MIN_AMOUNT = 5;

interface PayFastFormProps {
  /** Donation amount in ZAR (minimum R5.00) */
  amount: number;
  /** Optional suffix, e.g. a project title, appended to the item name */
  itemSuffix?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps any donate UI in the official PayFast Pay Now form.
 * Put a <button type="submit"> inside as a child; the amount is sent as a hidden field.
 */
export default function PayFastForm({ amount, itemSuffix, className, children }: PayFastFormProps) {
  const safeAmount = Number.isFinite(amount) && amount >= PAYFAST_MIN_AMOUNT ? amount : PAYFAST_MIN_AMOUNT;
  const itemName = itemSuffix ? `Donation Money - ${itemSuffix}` : "Donation Money";

  return (
    <form
      name="PayFastPayNowForm"
      action={PAYFAST_ACTION}
      method="post"
      className={className}
    >
      <input required type="hidden" name="cmd" value="_paynow" />
      <input required type="hidden" name="receiver" value={PAYFAST_RECEIVER} />
      <input required type="hidden" name="amount" value={safeAmount.toFixed(2)} />
      <input required type="hidden" name="item_name" maxLength={255} value={itemName.slice(0, 255)} />
      <input
        type="hidden"
        name="item_description"
        maxLength={255}
        value="Thank you for your contribution. This money will be used to continue to support the communities we serve"
      />
      {children}
    </form>
  );
}
