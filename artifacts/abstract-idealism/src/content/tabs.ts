export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: { text: string; sub?: string[] }[] };

export interface TabContent {
  id: "abstract" | "matrix";
  label: string;
  intro: string[];
  tableTitle: string;
  columns: [string, string, string];
  rows: [string, string, string][];
  divergenceTitle: string;
  divergences: { title: string; blocks: Block[] }[];
}

export const abstract: TabContent = {
  id: "abstract",
  label: "Abstract Construct",
  intro: [
    "Abstract Idealism is a metaphysical framework asserting that the ultimate ground of reality is neither non-conscious physical matter nor raw qualitative experience (qualia), but an uninstantiated matrix of pure mathematical logic, information syntax, and formal relation (The Abstract Mind).",
    "While Bernardo Kastrup's Analytic Idealism posits that the universe is fundamentally made of feeling (transpersonal subjective experience), Abstract Idealism argues that feeling itself is secondary. In this view, both subjective qualia (how things feel inside) and physical matter (how things look outside) are dual, symmetric projections of a deeper, non-phenomenal, abstract relational substrate.",
  ],
  tableTitle: "Comparative Breakdown: Analytic vs. Abstract Idealism",
  columns: ["Dimension", "Analytic Idealism (Kastrup)", "Abstract Idealism"],
  rows: [
    ["Fundamental Primitive", "**Qualitative Consciousness:** Raw subjective experience, felt emotion, and qualitative awareness (Mind at Large).", "**Pure Abstract Structure:** A non-phenomenal matrix of mathematical topology, formal logic, and semantic relations (The Syntactic Field)."],
    ["Status of Qualia (Feeling)", "**Fundamental:** Qualia (redness, pain, joy) are the irreducible building blocks of reality.", "**Internal Translation:** Qualia are the internal subjective decoding of abstract relations within a bounded perspective."],
    ["Status of Physical Matter", "**Extrinsic Appearance:** What transpersonal feelings look like when viewed across a dissociative boundary.", "**External Translation:** What abstract relations look like when rendered into spatial-temporal geometry."],
    ["Localization Mechanism", "**Psychiatric Dissociation:** Universal consciousness splits into localized \"alters\" (like whirlpools in a river).", "**Syntactic Parameterization:** The infinite abstract field projects low-dimensional sub-spaces (coordinate spaces) with localized rules."],
    ["Core Analogy", "Reality is an infinite universal dreamer having individual dreams.", "Reality is a self-executing hyper-dimensional category theory space generating dual rendering outputs."],
    ["Philosophical Ancestry", "Arthur Schopenhauer, Eastern Monism, Modern Psychiatry.", "Plato (Theory of Forms), Gottfried Leibniz (Monadology), Max Tegmark (Mathematical Universe Hypothesis)."],
  ],
  divergenceTitle: "Core Divergences in Detail",
  divergences: [
    {
      title: "Structural Primacy over Phenomenal Primacy",
      blocks: [{ kind: "ul", items: [
        { text: "**Analytic Idealism** claims that feeling is the fundamental substance. Before space or matter, there was raw qualitative sensing." },
        { text: "**Abstract Idealism** contends that raw feeling is too specific to be fundamental. Instead, fundamental reality consists of pure, non-empirical structural relationships (e.g., identity, difference, symmetry, implication). An experience of the color red is not the bottom layer; it is how a specific mathematical pattern of frequency and relation is experienced from within." },
      ] }],
    },
    {
      title: "Dual-Aspect Projection vs. Extrinsic Appearance",
      blocks: [{ kind: "ul", items: [
        { text: "In **Analytic Idealism**, the mental state is the primary cause, and the physical brain is merely its external image (like a face seen in a mirror)." },
        { text: "In **Abstract Idealism**, neither mind nor matter is primary over the other. The abstract matrix projects two simultaneous interfaces:", sub: [
          "**Interior Interface (Subjective Qualia):** The first-person semantic meaning of the abstract relations.",
          "**Exterior Interface (Objective Matter):** The third-person geometric measurement of those same abstract relations.",
        ] },
      ] }],
    },
    {
      title: "Localization: Parameterization vs. Dissociation",
      blocks: [{ kind: "ul", items: [
        { text: "Kastrup uses the psychological mechanism of dissociation (personality splits) to explain why you cannot read another person's mind." },
        { text: "Abstract Idealism replaces psychological dissociation with mathematical parameterization. An individual mind is not a \"split-off alter\" of a feeling giant, but a localized evaluation context\u2014a specific set of boundary conditions and mathematical constraints carved out within the broader abstract field." },
      ] }],
    },
  ],
};

export const mathematical: TabContent = {
  id: "matrix",
  label: "Abstract Matrix",
  intro: [
    "While both Abstract Idealism and Max Tegmark's Mathematical Universe Hypothesis (MUH) identify pure mathematical structure as the foundation of reality, they part ways on the metaphysical status of mind: Tegmark treats consciousness as an emergent computational property of mathematical structures, whereas Abstract Idealism treats consciousness as an intrinsic, primary aspect of the abstract matrix itself.",
  ],
  tableTitle: "Comparative Matrix: MUH vs. Abstract Idealism",
  columns: ["Dimension", "Mathematical Universe Hypothesis (MUH)", "Abstract Idealism"],
  rows: [
    ["Ontological Category", "**Radical Mathematical Platonism:** Reality is mathematics; physical structures are mathematical structures.", "**Dual-Aspect Idealism:** Reality is an abstract syntactic matrix (The Abstract Mind) with dual internal/external projections."],
    ["Status of Consciousness", "**Emergent / Derivative:** Mind is an accidental byproduct of \"Self-Aware Substructures\" (SASs)\u2014complex mathematical patterns capable of information processing.", "**Primary / Co-Fundamental:** Subjectivity is not a computational trick; it is the intrinsic first-person decoding of abstract syntax."],
    ["Fundamental Primitive", "Non-phenomenal, formal mathematical equations and sets (Level IV Multiverse).", "**The Syntactic Field:** An uninstantiated matrix of logic, information topology, and semantic relations."],
    ["Nature of Physical Reality", "Math equals physical reality directly; there is no separation between mathematical existence and physical existence.", "Physical reality is an **exterior rendering interface**\u2014how abstract relations look when observed geometrically from the outside."],
    ["Explanation of Qualia", "Subjective feelings (qualia) are reduced to data patterns processed by complex physical/mathematical systems.", "Qualia are the first-person semantic experience of abstract relational logic viewed from within a parameterization."],
  ],
  divergenceTitle: "Key Points of Divergence",
  divergences: [
    {
      title: "Emergent Computation vs. Intrinsic Semantics",
      blocks: [
        { kind: "p", text: "Max Tegmark's MUH belongs to the computational/physicalist tradition regarding mind. In MUH, a mathematical structure (like a complex neural net or quantum state) does not possess subjective feeling by default; feeling only arises when that mathematical structure reaches a specific type of self-referential information processing (a \"Self-Aware Substructure\")." },
        { kind: "p", text: "Abstract Idealism rejects this emergence model. It asserts that mathematics without an internal semantic aspect is an empty abstraction. The abstract field intrinsically possesses an interior dimension (subjective qualia) and an exterior dimension (physical measurements)." },
      ],
    },
    {
      title: "Identity vs. Dual Projection",
      blocks: [{ kind: "ul", items: [
        { text: "**MUH (Identity):** Physical reality does not represent math\u2014it is math. A frog, a star, or a brain is literally a 4D mathematical graph." },
        { text: "**Abstract Idealism (Projection):** Physical reality is a projection. The underlying matrix is pure information syntax. When translated through a localized observational boundary, that syntax renders externally as physical geometry and internally as subjective sensation." },
      ] }],
    },
    {
      title: "Cold Formalism vs. Meaningful Mind",
      blocks: [
        { kind: "p", text: "Under Tegmark's hypothesis, the universe is a cold, formal mathematical object operating independently of any observer or semantic context. Abstract Idealism re-frames the mathematical matrix as **The Abstract Mind**\u2014positing that formal relations, logic, and information syntax carry inherent qualitative potential and semantic meaning, making consciousness a built-in feature of reality rather than an afterthought." },
      ],
    },
  ],
};

export const TABS = [abstract, mathematical] as const;
