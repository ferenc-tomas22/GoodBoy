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
  setShelters: (sh: ShelterType[] | ((sh: ShelterType[]) => ShelterType[])) => void,
  setFormData: (fd: FormDataType | ((fd: FormDataType) => FormDataType)) => void,
  setCurrentFormStep: (cs: number | ((cs: number) => number)) => void,
}

export const useShelters = create<SheltersState>((set, get) => ({
  shelters: [],
  formData: defaultFormDataStructure,
  currentFormStep: 1,
  setShelters: sh => typeof sh === 'function' ? set({ shelters: sh(get().shelters) }) : set({ shelters: sh }),
  setFormData: fd => typeof fd === 'function' ? set({ formData: fd(get().formData) }) : set({ formData: fd }),
  setCurrentFormStep: cs => typeof cs === 'function' ? set({ currentFormStep: cs(get().currentFormStep) }): set({ currentFormStep: cs }),
}))