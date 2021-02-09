export interface IIdentity {
  firstName: string
  lastName: string
  dateOfBirth: string
}

export interface IPhysicalAddress {
  number: string
  street: string
  city: string
  postcode: string
}

export interface IContact {
  address: IPhysicalAddress
  email: string
  mobile: string
}

export interface IApplicantConfig {
  identity: IIdentity
  contact: IContact
  userProvidedInformation: Object
  authorizedInformation: Object
}