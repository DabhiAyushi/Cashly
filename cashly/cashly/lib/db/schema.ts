import { pgTable, serial, text, timestamp, decimal, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const receipts = pgTable('receipts', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url'),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
  status: text('status', { enum: ['pending', 'processed', 'failed'] }).default('pending').notNull(),
});

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  receiptId: integer('receipt_id').references(() => receipts.id).notNull(),
  merchantName: text('merchant_name'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('INR').notNull(),
  category: text('category', {
    enum: [
      'food',
      'lifestyle',
      'subscriptions',
      'transportation',
      'shopping',
      'entertainment',
      'utilities',
      'healthcare',
      'other'
    ]
  }).notNull(),
  date: timestamp('date'),
  description: text('description'),
  confidence: decimal('confidence', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const receiptsRelations = relations(receipts, ({ many }) => ({
  expenses: many(expenses),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  receipt: one(receipts, {
    fields: [expenses.receiptId],
    references: [receipts.id],
  }),
}));
