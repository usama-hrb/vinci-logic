// @ts-nocheck
import * as __fd_glob_28 from "../content/docs/Folder/file.mdx?collection=docs"
import * as __fd_glob_27 from "../content/docs/vinci.mdx?collection=docs"
import * as __fd_glob_26 from "../content/docs/threat-detection.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/test.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/only-test.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/integrations.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/incident-management.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/hello.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/hello-world.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/go.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/deployment.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/best-practices.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/architecture.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/api-reference.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/analytics.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/ana.mdx?collection=docs"
import * as __fd_glob_10 from "../content/blog/zero-trust-architecture.mdx?collection=blogPosts"
import * as __fd_glob_9 from "../content/blog/understanding-soc-platforms.mdx?collection=blogPosts"
import * as __fd_glob_8 from "../content/blog/threat-hunting-techniques.mdx?collection=blogPosts"
import * as __fd_glob_7 from "../content/blog/security-metrics-dashboard.mdx?collection=blogPosts"
import * as __fd_glob_6 from "../content/blog/machine-learning-threat-detection.mdx?collection=blogPosts"
import * as __fd_glob_5 from "../content/blog/incident-response-automation.mdx?collection=blogPosts"
import * as __fd_glob_4 from "../content/blog/implementing-siem-solutions.mdx?collection=blogPosts"
import * as __fd_glob_3 from "../content/blog/hello-world.mdx?collection=blogPosts"
import * as __fd_glob_2 from "../content/blog/cloud-security-monitoring.mdx?collection=blogPosts"
import * as __fd_glob_1 from "../content/blog/building-soc-team.mdx?collection=blogPosts"
import * as __fd_glob_0 from "../content/blog/api-security-monitoring.mdx?collection=blogPosts"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blogPosts = await create.doc("blogPosts", "content/blog", {"api-security-monitoring.mdx": __fd_glob_0, "building-soc-team.mdx": __fd_glob_1, "cloud-security-monitoring.mdx": __fd_glob_2, "hello-world.mdx": __fd_glob_3, "implementing-siem-solutions.mdx": __fd_glob_4, "incident-response-automation.mdx": __fd_glob_5, "machine-learning-threat-detection.mdx": __fd_glob_6, "security-metrics-dashboard.mdx": __fd_glob_7, "threat-hunting-techniques.mdx": __fd_glob_8, "understanding-soc-platforms.mdx": __fd_glob_9, "zero-trust-architecture.mdx": __fd_glob_10, });

export const docs = await create.docs("docs", "content/docs", {}, {"ana.mdx": __fd_glob_11, "analytics.mdx": __fd_glob_12, "api-reference.mdx": __fd_glob_13, "architecture.mdx": __fd_glob_14, "best-practices.mdx": __fd_glob_15, "deployment.mdx": __fd_glob_16, "getting-started.mdx": __fd_glob_17, "go.mdx": __fd_glob_18, "hello-world.mdx": __fd_glob_19, "hello.mdx": __fd_glob_20, "incident-management.mdx": __fd_glob_21, "index.mdx": __fd_glob_22, "integrations.mdx": __fd_glob_23, "only-test.mdx": __fd_glob_24, "test.mdx": __fd_glob_25, "threat-detection.mdx": __fd_glob_26, "vinci.mdx": __fd_glob_27, "Folder/file.mdx": __fd_glob_28, });