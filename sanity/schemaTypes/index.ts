import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { blockContentType } from "./blockContentType";

export const schemaTypes: SchemaTypeDefinition[] = [
    authorType,
    categoryType,
    postType,
    blockContentType,
];