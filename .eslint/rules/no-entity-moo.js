const ruleFactory = require("@sap/eslint-plugin-cds/lib/ruleFactory");

module.exports = ruleFactory.createRule(
  // Rule meta data
  {
    docs: {
      description: `Demonstrates how to implement a model validation check. This check does not allow any entities named 'Moo'.

             ________________________
            < No entity Moo allowed! >
             ------------------------
                    \   ^__^
                     \  (oo)\_______
                        (__)\       )\/\
                            ||----w |
                            ||     ||`,
      category: "Model Validation",
    },
    fixable: "code",
    type: "problem",
    version: "1.0.0",
  },

  // Rule (cds) logic
  (cds, context) => {
    let report = [];

    const filepath = context.getFilename();
    if (filepath.endsWith(".cds")) {
      // Always get model CSN from 'cds.model'
      const m = cds.reflect(cds.model);
      const namespace = m.namespace || "";

      // Browse all entities of relfected model
      m.forall("entity", (d) => {
        // Strip namespace from entity
        const entityName = d.name.replace(`${namespace}.`, "");

        // If entity name is "Moo"
        if (entityName === "Moo") {
          
          // Get ESLint properties $loc
          const loc = cds.getLocation(entityName, d);
          const sourcecode = context.getSourceCode();

          // Apply fix by changing "Moo" to "Moon"
          const fix = (fixer) => {
            const rangeEnd = sourcecode.getIndexFromLoc({line: loc.end.line, column: loc.end.column});
            return fixer.insertTextAfterRange([0, rangeEnd], "n");
          };
          report.push({ message: "Entity 'Moo' not allowed!", loc, fix, file: d.$location.file });
        }
      });
      return report;
    }
  }
);
