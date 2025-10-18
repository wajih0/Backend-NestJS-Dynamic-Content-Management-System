export class ArticleResponseDto {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorEmail: string;

  constructor(article: any) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.isPublished = article.isPublished;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
    this.authorEmail = article.author.email; 
  }
}
