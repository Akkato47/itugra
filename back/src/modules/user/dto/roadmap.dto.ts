export class TestResult {
  question: string;
  answer: string;
}

export class InterestedIn {
  uid: string;
  name: string;
}

export class CreateRoadmapDto {
  testResult: TestResult[];
  interestedIn: InterestedIn[];
}
