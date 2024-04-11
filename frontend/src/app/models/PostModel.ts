export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class FormPostModel {
  surveyId!: number;
  firstName!: string;
  lastName!: string;
  streetAddress!: string;
  city!: string;
  state!: string;
  zipCode!: number;
  phoneNumber!: string;
  email!: string;
  date!: Date;
  campusLikingArray!: string[];
  recommendation!: string;
  raffleNumbers!: string;
  won!: boolean;
  optionStudent: boolean = false;
  optionLocation: boolean = false;
  optionCampus: boolean = false;
  optionAtmosphere: boolean = false;
  optionDormRooms: boolean = false;
  optionSports: boolean = false;

  constructor(data: Partial<FormPostModel>) {
    Object.assign(this, data);
  }
}
