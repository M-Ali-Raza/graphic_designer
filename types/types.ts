

export type Content = {
  intro: any;
  job: any;
  btn_name: any;
  logo: any;
  content: string | Promise<string>;
};

export interface PostFrontMatter {
  name: string;
  category: string;
  image: string;
}

export interface PostMetadata extends PostFrontMatter {
  slug: string;
}

export interface PostContent extends PostMetadata {
  contentHtml: string;
}
