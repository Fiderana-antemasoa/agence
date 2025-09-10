import axios from "axios";
import { Client } from "@/types/clients";

const API_URL = "http://127.0.0.1:8000/api/clients";

// 📌 Récupérer tous les clients
export async function fetchClients(): Promise<Client[]> {
  const res = await axios.get<Client[]>(API_URL);
  return res.data;
}

// 📌 Créer un client
export async function createClient(newClient: Omit<Client, "id">): Promise<Client> {
  const res = await axios.post<Client>(API_URL, newClient);
  return res.data;
}

// 📌 Mettre à jour un client (par exemple statut ou autre)
export async function updateClient(id: number, updates: Partial<Client>): Promise<Client> {
  const res = await axios.put<Client>(`${API_URL}/${id}`, updates);
  return res.data;
}

// 📌 Supprimer un client
export async function deleteClient(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
