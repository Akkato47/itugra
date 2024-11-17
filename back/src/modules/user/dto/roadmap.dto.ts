export class TestResult {
  question: string;
  answer: string;
}

export class InterestedIn {
  uid: string;
  name: string;
}

export class CreateRoadmapDto {
  chosenCategory: number;
  testResult: TestResult[];
  interestedIn: InterestedIn[];
}
