type TabSwitcherProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => (
  <div className="flex bg-gray-100 rounded-xl overflow-hidden mt-1">
    {["Existant", "Adhésion"].map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`flex-1 text-sm font-medium py-2 transition-all ${
          activeTab === tab
            ? "bg-primary text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabSwitcher;
