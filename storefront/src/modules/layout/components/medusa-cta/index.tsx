import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="text-xs text-gray-400 mt-1">
        © {new Date().getFullYear()} Flower Bricks. All rights reserved.
      </div>
    </div>
  )
}

export default MedusaCTA
