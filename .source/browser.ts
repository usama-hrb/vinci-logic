// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"file.mdx": () => import("../content/docs/file.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "test.mdx": () => import("../content/docs/test.mdx?collection=docs"), "vinci.mdx": () => import("../content/docs/vinci.mdx?collection=docs"), }),
};
export default browserCollections;