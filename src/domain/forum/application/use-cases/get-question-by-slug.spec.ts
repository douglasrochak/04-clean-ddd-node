import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import GetQuestionBySlugUseCase from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"
import { Slug } from "../../enterprise/entities/shared"

describe("Get Question By Slug Use Case", () => {
  let repo: MemoryQuestionsRepo
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new GetQuestionBySlugUseCase(repo)
  })

  it("Should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    })

    await repo.create(newQuestion)

    const result = await sut.execute({
      slug: "example-question",
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
