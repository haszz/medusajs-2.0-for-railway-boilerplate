import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "My Account | Bricks Botanical Collection",
  description: "Manage your Bricks Botanical Collection account, view orders, and update your profile.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return (
    <div className="pb-12 rounded-lg">
      <Overview customer={customer} orders={orders} />
    </div>
  )
}
