import React from "react";
import { transform } from "buble";
import {
  Page,
  Text,
  Link,
  Font,
  View,
  Canvas,
  Note,
  Image,
  G,
  Svg,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Tspan,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  ClipPath,
  LinearGradient,
  RadialGradient,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind-config";

const twConfig = resolveConfig(tailwindConfig);
const tw = createTw(twConfig);

const Document = "DOCUMENT";

const primitives = {
  Document,
  Page,
  Text,
  Link,
  Font,
  View,
  Note,
  Image,
  Canvas,
  G,
  Svg,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Tspan,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  ClipPath,
  LinearGradient,
  RadialGradient,
  StyleSheet,
  tw,
};

const transpile = (
  code: string,
  callback: (doc: any) => void,
  onError: (error: Error) => void
) => {
  try {
    const result = transform(code, {
      objectAssign: "Object.assign",
      transforms: {
        dangerousForOf: true,
        dangerousTaggedTemplateString: true,
      },
    });

    const res = new Function(
      "React",
      "ReactPDF",
      ...Object.keys(primitives),
      result.code
    );

    res(
      React,
      { render: (doc: any) => callback(doc) },
      ...Object.values(primitives)
    );
  } catch (e) {
    if (onError) {
      onError(e as Error);
    }
  }
};

export default transpile;
