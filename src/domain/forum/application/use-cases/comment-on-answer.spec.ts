import { MemoryAnswersRepo } from "test/memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import CommentOnAnswerUseCase from "./comment-on-answer"
import { MemoryAnswerCommentsRepo } from "test/memory-answer-comments-repository"

describe("Comment on Answer Use Case", () => {
  let answerRepo: MemoryAnswersRepo
  let answerCommentsRepo: MemoryAnswerCommentsRepo
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    answerRepo = new MemoryAnswersRepo()
    answerCommentsRepo = new MemoryAnswerCommentsRepo()
    sut = new CommentOnAnswerUseCase(answerRepo, answerCommentsRepo)
  })

  it("Should be able to comment on answer", async () => {
    const answer = makeAnswer()
    answerRepo.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Test Answer",
    })

    expect(answerCommentsRepo.items[0].content).toEqual("Test Answer")
  })
})
