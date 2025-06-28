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

export interface Services {
  logo: string;
  title: string;
  details: string;
}

export interface Navbar {
  name: string;
  path: string;
}

export interface Education {
  subject: string;
  institution: string;
  details: string;
}
