import { motion } from 'framer-motion';
import { X, Printer, Mail, Download } from 'lucide-react';
import type { Order } from '../data/orders';
import './InvoiceModal.css';

const COMPANY = {
  name: 'Care Drive Enclosed Mobility LLC',
  phone: '+1 (912) 558-9673',
  email: 'caredriveenclosedmobility@gmail.com',
};

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

const money = (n: number) =>
  `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Human-friendly invoice number derived from the order id. */
const invoiceNumber = (order: Order) => {
  const digits = order.id.replace(/\D/g, '').slice(-6) || '000000';
  return `INV-${digits}`;
};

const formatDate = (iso: string) => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  const invNo = invoiceNumber(order);
  const balanceDue =
    order.paymentOption === 'down' && order.downPayment != null
      ? order.total - order.downPayment
      : 0;
  const amountDueNow =
    order.paymentOption === 'down' && order.downPayment != null
      ? order.downPayment
      : order.total;

  const itemsRows = order.items
    .map(
      (i) => `
        <tr>
          <td>${i.name}</td>
          <td style="text-align:center">${i.quantity}</td>
          <td style="text-align:right">${money(i.price)}</td>
          <td style="text-align:right">${money(i.price * i.quantity)}</td>
        </tr>`
    )
    .join('');

  /** Build a fully self-contained invoice document for printing / saving as PDF. */
  const buildPrintHtml = () => `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${invNo} — ${COMPANY.name}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 0; padding: 40px; }
  .wrap { max-width: 720px; margin: 0 auto; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 28px; }
  .brand { font-size: 22px; font-weight: 800; color: #059669; }
  .brand-sub { font-size: 12px; color: #6b7280; margin-top: 4px; max-width: 240px; line-height: 1.5; }
  .inv-title { text-align: right; }
  .inv-title h1 { margin: 0; font-size: 30px; letter-spacing: 2px; color: #111827; }
  .inv-meta { font-size: 13px; color: #6b7280; margin-top: 6px; line-height: 1.7; }
  .parties { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
  .party-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 6px; }
  .party-name { font-weight: 700; font-size: 15px; }
  .party-line { font-size: 13px; color: #4b5563; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  thead th { background: #f3f4f6; text-align: left; padding: 10px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; color: #6b7280; }
  thead th:nth-child(2) { text-align: center; }
  thead th:nth-child(3), thead th:nth-child(4) { text-align: right; }
  tbody td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
  .totals { margin-left: auto; width: 300px; font-size: 14px; }
  .totals .row { display: flex; justify-content: space-between; padding: 7px 0; }
  .totals .grand { border-top: 2px solid #111827; margin-top: 6px; padding-top: 12px; font-size: 18px; font-weight: 800; }
  .totals .due { color: #059669; font-weight: 700; }
  .free { color: #059669; font-weight: 700; }
  .terms { margin-top: 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 18px; font-size: 13px; color: #4b5563; line-height: 1.7; }
  .terms strong { color: #111827; }
  .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #9ca3af; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="brand">Care Drive</div>
        <div class="brand-sub">${COMPANY.name}<br/>${COMPANY.phone} · ${COMPANY.email}</div>
      </div>
      <div class="inv-title">
        <h1>INVOICE</h1>
        <div class="inv-meta">
          <div><strong>${invNo}</strong></div>
          <div>Date: ${formatDate(order.createdAt)}</div>
          <div>Status: ${order.status}</div>
        </div>
      </div>
    </div>

    <div class="parties">
      <div>
        <div class="party-label">Bill To</div>
        <div class="party-name">${order.customerName}</div>
        <div class="party-line">${order.customerEmail}</div>
        <div class="party-line">${order.customerPhone || ''}</div>
      </div>
      <div style="text-align:right">
        <div class="party-label">Payment</div>
        <div class="party-line">${order.paymentOption === 'full' ? 'Full Payment' : 'Down Payment (30%)'}</div>
        <div class="party-line">Delivery: FREE 3-Day Shipping</div>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Amount</th></tr>
      </thead>
      <tbody>${itemsRows}</tbody>
    </table>

    <div class="totals">
      <div class="row"><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
      <div class="row"><span>Shipping</span><span class="free">FREE</span></div>
      <div class="row grand"><span>Total</span><span>${money(order.total)}</span></div>
      ${
        order.paymentOption === 'down'
          ? `<div class="row due"><span>Amount Due Now (30%)</span><span>${money(amountDueNow)}</span></div>
             <div class="row"><span>Balance on Delivery</span><span>${money(balanceDue)}</span></div>`
          : `<div class="row due"><span>Amount Due</span><span>${money(amountDueNow)}</span></div>`
      }
    </div>

    <div class="terms">
      <strong>Payment Terms:</strong> ${
        order.paymentOption === 'down'
          ? `A 30% down payment of ${money(amountDueNow)} secures your order. The remaining balance of ${money(balanceDue)} is due upon delivery.`
          : `Full payment of ${money(amountDueNow)} is due to confirm this order.`
      }
      <br/>We accept Zelle, Cash App, Chime, and Apple Pay. Please reference invoice ${invNo} with your payment.
    </div>

    <div class="footer">Thank you for choosing Care Drive Enclosed Mobility · ${COMPANY.phone}</div>
  </div>
</body>
</html>`;

  const handlePrint = () => {
    const win = window.open('', '_blank', 'width=820,height=900');
    if (!win) {
      alert('Please allow pop-ups to print or save the invoice as PDF.');
      return;
    }
    win.document.write(buildPrintHtml());
    win.document.close();
    win.focus();
    // Give the new window a moment to render before invoking print.
    setTimeout(() => win.print(), 350);
  };

  const handleEmail = () => {
    const lines = order.items
      .map((i) => `- ${i.name} x${i.quantity} — ${money(i.price * i.quantity)}`)
      .join('%0D%0A');

    const body = [
      `Dear ${order.customerName},`,
      '',
      `Please find below your invoice ${invNo} from ${COMPANY.name}.`,
      '',
      `Invoice: ${invNo}`,
      `Date: ${formatDate(order.createdAt)}`,
      '',
      'Items:',
      lines,
      '',
      `Subtotal: ${money(order.subtotal)}`,
      `Shipping: FREE 3-Day Shipping`,
      `Total: ${money(order.total)}`,
      order.paymentOption === 'down'
        ? `Amount Due Now (30%): ${money(amountDueNow)}%0D%0ABalance on Delivery: ${money(balanceDue)}`
        : `Amount Due: ${money(amountDueNow)}`,
      '',
      'We accept Zelle, Cash App, Chime, and Apple Pay.',
      `Please reference invoice ${invNo} with your payment.`,
      '',
      'Thank you for choosing Care Drive Enclosed Mobility.',
      `${COMPANY.phone} · ${COMPANY.email}`,
    ].join('%0D%0A');

    const subject = `Invoice ${invNo} — Care Drive Enclosed Mobility`;
    window.location.href = `mailto:${order.customerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
  };

  return (
    <div className="inv-overlay" onClick={onClose}>
      <motion.div
        className="inv-modal"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inv-modal-header">
          <h3>Invoice {invNo}</h3>
          <button className="inv-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="inv-preview">
          <div className="inv-doc">
            <div className="inv-doc-top">
              <div>
                <div className="inv-brand">Care Drive</div>
                <div className="inv-brand-sub">
                  {COMPANY.name}
                  <br />
                  {COMPANY.phone} · {COMPANY.email}
                </div>
              </div>
              <div className="inv-doc-title">
                <h1>INVOICE</h1>
                <div className="inv-doc-meta">
                  <div><strong>{invNo}</strong></div>
                  <div>Date: {formatDate(order.createdAt)}</div>
                  <div>Status: {order.status}</div>
                </div>
              </div>
            </div>

            <div className="inv-parties">
              <div>
                <div className="inv-party-label">Bill To</div>
                <div className="inv-party-name">{order.customerName}</div>
                <div className="inv-party-line">{order.customerEmail}</div>
                <div className="inv-party-line">{order.customerPhone}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="inv-party-label">Payment</div>
                <div className="inv-party-line">
                  {order.paymentOption === 'full' ? 'Full Payment' : 'Down Payment (30%)'}
                </div>
                <div className="inv-party-line">Delivery: FREE 3-Day Shipping</div>
              </div>
            </div>

            <table className="inv-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Unit Price</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((i, idx) => (
                  <tr key={idx}>
                    <td>{i.name}</td>
                    <td style={{ textAlign: 'center' }}>{i.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{money(i.price)}</td>
                    <td style={{ textAlign: 'right' }}>{money(i.price * i.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="inv-totals">
              <div className="inv-row"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
              <div className="inv-row"><span>Shipping</span><span className="inv-free">FREE</span></div>
              <div className="inv-row inv-grand"><span>Total</span><span>{money(order.total)}</span></div>
              {order.paymentOption === 'down' ? (
                <>
                  <div className="inv-row inv-due"><span>Amount Due Now (30%)</span><span>{money(amountDueNow)}</span></div>
                  <div className="inv-row"><span>Balance on Delivery</span><span>{money(balanceDue)}</span></div>
                </>
              ) : (
                <div className="inv-row inv-due"><span>Amount Due</span><span>{money(amountDueNow)}</span></div>
              )}
            </div>
          </div>
        </div>

        <div className="inv-actions">
          <button className="inv-btn-outline" onClick={onClose}>Close</button>
          <button className="inv-btn-outline" onClick={handleEmail}>
            <Mail size={15} /> Email to Customer
          </button>
          <button className="inv-btn-primary" onClick={handlePrint}>
            <Printer size={15} /> Print / Save PDF <Download size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
