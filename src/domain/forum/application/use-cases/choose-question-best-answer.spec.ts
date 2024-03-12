import { MemoryAnswersRepo } from "test/memory-answers-repo"
import { UniqueEntityID } from "@/core/entities"
import { makeAnswer } from "test/factories/make-answer"
import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import ChooseQuestionBestAnswerUseCase from "./choose-question-best-answer"
import { makeQuestion } from "test/factories/make-question"

describe("Choose Question Best Answer Use Case", () => {
  let answerRepo: MemoryAnswersRepo
  let questionRepo: MemoryQuestionsRepo
  let sut: ChooseQuestionBestAnswerUseCase

  beforeEach(() => {
    answerRepo = new MemoryAnswersRepo()
    questionRepo = new MemoryQuestionsRepo()
    sut = new ChooseQuestionBestAnswerUseCase(questionRepo, answerRepo)
  })

  it("Should be able to choose question best answer", async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionRepo.create(question)
    answerRepo.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(questionRepo.items[0].bestAnswerId).toEqual(answer.id)
  })

  it("Should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-id-1"),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionRepo.create(question)
    answerRepo.create(answer)

    await expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: "not-same-id",
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
