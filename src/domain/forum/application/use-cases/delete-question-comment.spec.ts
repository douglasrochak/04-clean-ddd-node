import { MemoryQuestionCommentsRepo } from "test/memory-question-comments-repo"
import DeleteQuestionCommentUseCase from "./delete-question-comment"
import { makeQuestionComment } from "test/factories/make-question-comment"
import { UniqueEntityID } from "@/core/entities"

describe("Delete Question Comment Use Case", () => {
  let repo: MemoryQuestionCommentsRepo
  let sut: DeleteQuestionCommentUseCase

  beforeEach(() => {
    repo = new MemoryQuestionCommentsRepo()
    sut = new DeleteQuestionCommentUseCase(repo)
  })

  it("Should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment()
    repo.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(repo.items).toHaveLength(0)
  })

  it("Should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-01"),
    })
    repo.create(questionComment)

    await expect(() => {
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: "author-02",
      })
    }).rejects.toBeInstanceOf(Error)

    expect(repo.items).toHaveLength(1)
  })
})
