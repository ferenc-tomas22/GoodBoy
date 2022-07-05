import create from 'zustand'

export const defaultFormDataStructure: {
  supportEntireFoundation: boolean,
  processingPersonalData: boolean,
  selectedShelterId: number | null,
  contributionAmount: string,
  firstName: string,
  lastName: string,
  email: string,
  phonePrefix: string,
  phone: string,
} = {
  supportEntireFoundation: false,
  processingPersonalData: false,
  selectedShelterId: null,
  contributionAmount: '',
  firstName: '',
  lastName: '',
  email: '',
  phonePrefix: '+421',
  phone: '',
}

export type FormDataType = typeof defaultFormDataStructure
export type ShelterType = { id: number, name: string }
interface SheltersState {
  shelters: ShelterType[],
  formData: FormDataType,
  currentFormStep: number,
  setShelters: (shelters: ShelterType[]) => void,
  setFormData: (formData: FormDataType) => void,
  setCurrentFormStep: (currentFormStep: number) => void
}

export const useShelters = create<SheltersState>(set => ({
  shelters: [],
  formData: defaultFormDataStructure,
  currentFormStep: 1,
  setShelters: shelters => set({ shelters }),
  setFormData: formData => set({ formData }),
  setCurrentFormStep: currentFormStep => set({ currentFormStep }),
}))