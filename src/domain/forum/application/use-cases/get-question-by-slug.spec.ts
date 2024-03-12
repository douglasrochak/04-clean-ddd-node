import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import GetQuestionBySlugUseCase from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"
import { Slug } from "../../enterprise/entities/shared"

describe("Get Question By Slug", () => {
  let repo: MemoryQuestionsRepo
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new GetQuestionBySlugUseCase(repo)
  })

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    })

    await repo.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question",
    })

    expect(question).toBeTruthy()
    expect(question.slug.value).toEqual("example-question")
  })
})
