import { z } from "zod";
import { configSchema } from "../lib/configSchema.js";

const { $schema, ...firmwareConfig } = z.toJSONSchema(configSchema, {
	target: "draft-07",
	io: "input",
});

const jsonSchema = {
	$schema,
	$ref: "#/definitions/firmwareConfig",
	definitions: { firmwareConfig },
};
console.log(JSON.stringify(jsonSchema, null, "\t"));
