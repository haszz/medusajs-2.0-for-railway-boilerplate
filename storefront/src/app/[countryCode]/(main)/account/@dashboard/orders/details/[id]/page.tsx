import { retrieveOrder } from "@lib/data/orders"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: `Order #${order.display_id} | Botanical Bricks`,
    description: `View details for your order #${order.display_id} from Botanical Bricks, including order status, items, shipping information and payment details.`,
    openGraph: {
      title: `Order #${order.display_id} | Botanical Bricks`,
      description: `View your Botanical Bricks order details, status and shipping information.`,
      type: 'website',
    }
  }
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto pt-2 pb-12">
      <OrderDetailsTemplate order={order} />
    </div>
  )
}
