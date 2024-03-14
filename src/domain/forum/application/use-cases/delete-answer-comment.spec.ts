import { MemoryAnswerCommentsRepo } from "test/memory-answer-comments-repo"
import DeleteAnswerCommentUseCase from "./delete-answer-comment"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { UniqueEntityID } from "@/core/entities"

describe("Delete Answer Comment Use Case", () => {
  let repo: MemoryAnswerCommentsRepo
  let sut: DeleteAnswerCommentUseCase

  beforeEach(() => {
    repo = new MemoryAnswerCommentsRepo()
    sut = new DeleteAnswerCommentUseCase(repo)
  })

  it("Should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment()
    repo.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(repo.items).toHaveLength(0)
  })

  it("Should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-01"),
    })
    repo.create(answerComment)

    await expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: "author-02",
      })
    }).rejects.toBeInstanceOf(Error)

    expect(repo.items).toHaveLength(1)
  })
})
