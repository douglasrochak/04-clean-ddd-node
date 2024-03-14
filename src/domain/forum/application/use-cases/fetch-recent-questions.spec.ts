import { MemoryQuestionsRepo } from "test/memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import FetchRecentQuestionsUseCase from "./fetch-recent-questions"

describe("Fetch Recent Questions Use Case", () => {
  let repo: MemoryQuestionsRepo
  let sut: FetchRecentQuestionsUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new FetchRecentQuestionsUseCase(repo)
  })

  it("Should be able to fetch recent questions", async () => {
    await repo.create(makeQuestion({ createdAt: new Date(2023, 0, 20) }))
    await repo.create(makeQuestion({ createdAt: new Date(2023, 0, 25) }))
    await repo.create(makeQuestion({ createdAt: new Date(2023, 0, 18) }))

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
    ])
  })

  it("Should be able to fetch paginated recent questions", async () => {
    for (let i = 0; i < 22; i++) {
      await repo.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
