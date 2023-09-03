export class Tag {
  constructor(
    readonly id: number,
    readonly text: string,
    readonly project: string | number
  ) {}

  static create(text: string): Tag {
    return new Tag(0, text, 0)
  }
}
