import { MemoryQuestionsRepo } from "test/memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import DeleteQuestionUseCase from "./delete-question"
import { UniqueEntityID } from "@/core/entities"
import { NotAllowedError } from "./errors/not-allowed"
import { MemoryQuestionAttachmentsRepo } from "test/memory-question-attachments-repository"
import { makeQuestionAttachment } from "test/factories/make-question-attachment"

describe("Delete Question Use Case", () => {
  let questionRepo: MemoryQuestionsRepo
  let questionAttachmentsRepo: MemoryQuestionAttachmentsRepo
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    questionAttachmentsRepo = new MemoryQuestionAttachmentsRepo()
    questionRepo = new MemoryQuestionsRepo(questionAttachmentsRepo)
    sut = new DeleteQuestionUseCase(questionRepo)
  })

  it("Should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID("question-id")
    )
    await questionRepo.create(newQuestion)

    questionAttachmentsRepo.items.push(
      makeQuestionAttachment({ questionId: new UniqueEntityID("question-id") }),
      makeQuestionAttachment({ questionId: new UniqueEntityID("question-id") })
    )

    await sut.execute({
      questionId: "question-id",
      authorId: "author-id",
    })

    expect(questionRepo.items).toHaveLength(0)
    expect(questionAttachmentsRepo.items).toHaveLength(0)
  })

  it("Should not be able to delete a question with different authorId", async () => {
    const id = "question-id"
    const newQuestion = makeQuestion({}, new UniqueEntityID(id))
    await questionRepo.create(newQuestion)

    const result = await sut.execute({
      questionId: id,
      authorId: "author-id",
    })

    expect(questionRepo.items).toHaveLength(1)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
