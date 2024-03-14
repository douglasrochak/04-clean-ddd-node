import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import CreateQuestionUseCase from "./create-question"
import { UniqueEntityID } from "@/core/entities"

describe("Create Question", () => {
  let repo: MemoryQuestionsRepo
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new CreateQuestionUseCase(repo)
  })

  it("should be able to create an question", async () => {
    const result = await sut.execute({
      authorId: "fake-author-id",
      title: "Question 1",
      content: "Question content",
      attachmentsIds: ["1", "2"],
    })

    expect(result.isRight()).toEqual(true)
    expect(repo.items[0].id).toEqual(result.value?.question.id)
    expect(repo.items[0].attachments.currentItems).toHaveLength(2)
    expect(repo.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        questionId: result.value?.question.id,
      }),
      expect.objectContaining({
        questionId: result.value?.question.id,
      }),
    ])
    expect(repo.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
    ])
  })
})
