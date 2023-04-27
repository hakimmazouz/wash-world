export const BASE_URL =
  "https://b46f027d-3a5f-4de6-9075-5e861759e531.mock.pstmn.io";

export interface Location {
  id: number;
  name: string;
  status: "available" | "maintenance";
}

export interface Product {
  productid: number;
  name: string;
  description: string;
  price: string;
  program: number;
  duration: string;
}

export interface WashProgram {
  program: string;
  estimated_duration: string;
  location: number;
}

interface LocationsResponse {
  locations: Location[];
}

interface ProductsResponse {
  lpn: string;
  products: Product[];
}

interface LocationCameraResponse {
  lpn: string;
  description: string;
  location: number;
}

interface WashResponse extends WashProgram {}

export async function getLocations(): Promise<LocationsResponse> {
  const res = await fetch(BASE_URL + "/locations");

  if (!res.ok) throw new Error("Failed to fetch data");

  const { response } = await res.json();

  return response;
}

export async function getProducts(
  licensePlateNumber: string = "BV99123"
): Promise<ProductsResponse> {
  const res = await fetch(BASE_URL + "/products/" + licensePlateNumber);

  if (!res.ok) throw new Error("Failed to fetch data");

  const { response } = await res.json();

  return response;
}

export async function getLocationCamera(
  locationId: string
): Promise<LocationCameraResponse> {
  const res = await fetch(BASE_URL + "/cam/" + locationId);

  if (!res.ok) throw new Error("Failed to fetch data");

  const { response } = await res.json();

  return response;
}

export async function startWash(
  locationId: string,
  programId: string
): Promise<WashResponse | boolean> {
  try {
    const res = await fetch(BASE_URL + `/${locationId}/start/${programId}`, {
      method: "POST",
    });

    const { response } = await res.json();

    return response;
  } catch (e) {
    console.log(e);

    return false;
  }
}
