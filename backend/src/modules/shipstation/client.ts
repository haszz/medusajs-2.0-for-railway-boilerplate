import { MedusaError } from "@medusajs/framework/utils";
import { ShipStationOptions } from "./service";
import { CarriersResponse, GetShippingRatesRequest, GetShippingRatesResponse, Label, PurchaseLabelRequest, RateResponse, Shipment, VoidLabelResponse } from "./types";

export class ShipStationClient {
  options: ShipStationOptions

  constructor(options) {
    this.options = options
  }

  private async sendRequest(url: string, data?: RequestInit): Promise<any> {
    console.log("[ShipStationClient] Sending request to URL:", url);
    if (data) {
      console.log("[ShipStationClient] Request data:", data);
    }
    return fetch(`https://api.shipstation.com/v2${url}`, {
      ...data,
      headers: {
        ...data?.headers,
        'api-key': this.options.api_key,
        "Content-Type": "application/json"
      }
    }).then(async (resp) => {
      const contentType = resp.headers.get("content-type");
      let responseBody;
      if (!contentType?.includes("application/json")) {
        responseBody = await resp.text();
        console.log("[ShipStationClient] Received non-JSON response:", responseBody);
        return responseBody;
      }

      responseBody = await resp.json();
      console.log("[ShipStationClient] Received JSON response:", responseBody);
      return responseBody;
    })
    .then((resp) => {
      if (typeof resp !== "string" && resp.errors?.length) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `An error occured while sending a request to ShipStation: ${
            resp.errors.map((error) => error.message)
          }`
        )
      }

      return resp
    })
  }

  async getCarriers(): Promise<CarriersResponse> {
    console.log("[ShipStationClient] getCarriers called");
    const result = await this.sendRequest("/carriers");
    console.log("[ShipStationClient] getCarriers response:", result);
    return result;
  }

  async getShippingRates(data: GetShippingRatesRequest): Promise<GetShippingRatesResponse> {
    console.log("[ShipStationClient] getShippingRates called with data:", data);
    const result = await this.sendRequest("/rates", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.rate_response.errors?.length) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `An error occured while retrieving rates from ShipStation: ${
            resp.rate_response.errors.map((error) => error.message)
          }`
        )
      }

      return resp
    });
    console.log("[ShipStationClient] getShippingRates response:", result);
    return result;
  }

  async getShipmentRates(id: string): Promise<RateResponse[]> {
    console.log("[ShipStationClient] getShipmentRates called with id:", id);
    const result = await this.sendRequest(`/shipments/${id}/rates`);
    console.log("[ShipStationClient] getShipmentRates response:", result);
    return result;
  }

  async purchaseLabelForShipment(id: string): Promise<Label> {
    console.log("[ShipStationClient] purchaseLabelForShipment called with id:", id);
    const result = await this.sendRequest(`/labels/shipment/${id}`, {
      method: "POST",
      body: JSON.stringify({})
    });
    console.log("[ShipStationClient] purchaseLabelForShipment response:", result);
    return result;
  }

  async voidLabel(id: string): Promise<VoidLabelResponse> {
    console.log("[ShipStationClient] voidLabel called with id:", id);
    const result = await this.sendRequest(`/labels/${id}/void`, {
      method: "PUT"
    });
    console.log("[ShipStationClient] voidLabel response:", result);
    return result;
  }

  async cancelShipment(id: string): Promise<void> {
    console.log("[ShipStationClient] cancelShipment called with id:", id);
    const result = await this.sendRequest(`/shipments/${id}/cancel`, {
      method: "PUT"
    });
    console.log("[ShipStationClient] cancelShipment response:", result);
    return result;
  }

  async getShipment(id: string): Promise<Shipment> {
    console.log("[ShipStationClient] getShipment called with id:", id);
    const result = await this.sendRequest(`/shipments/${id}`);
    console.log("[ShipStationClient] getShipment response:", result);
    return result;
  }
}