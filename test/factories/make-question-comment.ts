import { UniqueEntityID } from "@/core/entities"
import QuestionComment, {
  QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment"
import { faker } from "@faker-js/faker"

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionCommentId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return questionComment
}
