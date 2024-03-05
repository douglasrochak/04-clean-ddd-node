import AnswerQuestionUseCase from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const content = 'Nova resposta';
  const answer = await answerQuestion.execute({
    content,
    instructorId: '1',
    questionId: '1',
  });

  expect(answer.content).toEqual(content);
});
