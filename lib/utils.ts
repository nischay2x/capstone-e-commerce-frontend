import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function createFormDataFromObject(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          formData.append(key, obj[key]);
      }
  }
  return formData;
}


const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export function formatToINR(amount: number){
  return inrFormatter.format(amount);
}

export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(1), ms)
  })
}