import { supabase, Software } from '@/utils/supabase';

// Hämtar alla program från vår databas, vi typar interface för software i supabase.ts 
// Sorterar även i fallande ordning, så senaste programmet visas först, det är viktigt för vi ska ha en "recently added" sektion senare.
export async function getAllSoftware() {
  const { data, error } = await supabase
    .from('software')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
// hämtar specifikt program baserat på ID!!!!
export async function getSoftwareById(id: string) {
  const { data, error } = await supabase
    .from('software')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
// extraherar unika kategorier från alla våra programvaror
// istället för att ha en massa kategorier i databasen, rätt eller fel? fungerar det ja.
export function getUniqueCategories(software: Software[]) {
  return Array.from(new Set(software.map(item => item.category)));
}

// filtrerar programvaror baserat på kategori, används i software pagen. :) 
export function filterSoftwareByCategory(software: Software[], category: string) {
  if (category === 'all') {
    return software;
  }
  return software.filter(item => item.category === category);
} 