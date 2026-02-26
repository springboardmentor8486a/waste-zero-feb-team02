export const createOpportunitySlice = (set) => ({
  opportunities: [
    {
      id: "1",
      title: "Beach Cleanup Drive",
      description: "Help clean the beach area.",
      requiredSkills: "Teamwork",
      duration: "2 weeks",
      location: "Mumbai",
      status: "Open",
    },
    {
      id: "2",
      title: "Tree Plantation Camp",
      description: "Plant trees in parks.",
      requiredSkills: "Gardening",
      duration: "1 week",
      location: "Delhi",
      status: "Closed",
    },
  ],

  updateOpportunity: (id, updatedData) =>
    set((state) => ({
      opportunities: state.opportunities.map((op) =>
        op.id === id ? { ...op, ...updatedData } : op,
      ),
    })),

  deleteOpportunity: (id) =>
    set((state) => ({
      opportunities: state.opportunities.filter((op) => op.id !== id),
    })),

  addOpportunity: (newOpportunity) =>
    set((state) => ({
      opportunities: [
        ...state.opportunities,
        { ...newOpportunity, id: Date.now().toString() },
      ],
    })),
});
