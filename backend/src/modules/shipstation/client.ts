import { MedusaError } from "@medusajs/framework/utils";
import { ShipStationOptions } from "./service";
import { CarriersResponse, GetShippingRatesRequest, GetShippingRatesResponse, Label, PurchaseLabelRequest, RateResponse, Shipment, VoidLabelResponse } from "./types";

export class ShipStationClient {
  options: ShipStationOptions

  constructor(options) {
    this.options = options
  }

  private async sendRequest(url: string, data?: RequestInit): Promise<any> {
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
        return responseBody;
      }

      responseBody = await resp.json();
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
    const result = await this.sendRequest("/carriers");
    return result;
  }

  async getShippingRates(data: GetShippingRatesRequest): Promise<GetShippingRatesResponse> {
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
    return result;
  }

  async getShipmentRates(id: string): Promise<RateResponse[]> {
    const result = await this.sendRequest(`/shipments/${id}/rates`);
    return result;
  }

  async purchaseLabelForShipment(id: string): Promise<Label> {
    const result = await this.sendRequest(`/labels/shipment/${id}`, {
      method: "POST",
      body: JSON.stringify({})
    });
    return result;
  }

  async voidLabel(id: string): Promise<VoidLabelResponse> {
    const result = await this.sendRequest(`/labels/${id}/void`, {
      method: "PUT"
    });
    return result;
  }

  async cancelShipment(id: string): Promise<void> {
    const result = await this.sendRequest(`/shipments/${id}/cancel`, {
      method: "PUT"
    });
    return result;
  }

  async getShipment(id: string): Promise<Shipment> {
    const result = await this.sendRequest(`/shipments/${id}`);
    return result;
  }
}