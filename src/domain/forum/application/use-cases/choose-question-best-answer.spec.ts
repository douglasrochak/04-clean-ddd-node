import { MemoryAnswersRepo } from "test/memory-answers-repository"
import { UniqueEntityID } from "@/core/entities"
import { makeAnswer } from "test/factories/make-answer"
import { MemoryQuestionsRepo } from "test/memory-questions-repository"
import ChooseQuestionBestAnswerUseCase from "./choose-question-best-answer"
import { makeQuestion } from "test/factories/make-question"
import { NotAllowedError } from "./errors/not-allowed"
import { MemoryQuestionAttachmentsRepo } from "test/memory-question-attachments-repository"

describe("Choose Question Best Answer Use Case", () => {
  let answersRepo: MemoryAnswersRepo
  let questionsRepo: MemoryQuestionsRepo
  let questionAttachmentsRepo: MemoryQuestionAttachmentsRepo
  let sut: ChooseQuestionBestAnswerUseCase

  beforeEach(() => {
    questionAttachmentsRepo = new MemoryQuestionAttachmentsRepo()
    questionsRepo = new MemoryQuestionsRepo(questionAttachmentsRepo)
    answersRepo = new MemoryAnswersRepo()
    sut = new ChooseQuestionBestAnswerUseCase(questionsRepo, answersRepo)
  })

  it("Should be able to choose question best answer", async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionsRepo.create(question)
    answersRepo.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(questionsRepo.items[0].bestAnswerId).toEqual(answer.id)
  })

  it("Should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-id-1"),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionsRepo.create(question)
    answersRepo.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "not-same-id",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
