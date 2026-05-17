import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/monitor-card.ts",
  output: {
    file: "../custom_components/monitor_allenamenti/www/monitor-allenamenti-card.js",
    format: "es",
  },
  plugins: [
    resolve(),
    typescript(),
    terser({ format: { comments: false } }),
  ],
};
