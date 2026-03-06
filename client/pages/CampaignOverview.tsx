import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Download,
  Copy,
  Trash2,
  Calendar,
  Target,
  Users,
  Building2,
  Globe,
  TrendingUp,
  MessageSquare,
  ArrowLeft,
  Package,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingStatsWidget } from "@/components/ui/floating-stats-widget";

// Mock data for the campaign
const campaignData = {
  id: "1",
  name: "Q1 Software Engineers Campaign",
  status: "Completed",
  assignedTeamMember: {
    name: "Sarah Johnson",
    avatar: "",
    initials: "SJ",
  },
  completionDate: "2024-01-15",
  adminComment: "This campaign is Accepted",
};

// KPI data
const kpiData = [
  { label: "CS", value: 2499, icon: Target, color: "bg-blue-500" },
  { label: "MQL", value: 1550, icon: Users, color: "bg-green-500" },
  { label: "HQL", value: 820, icon: TrendingUp, color: "bg-purple-500" },
  { label: "BANT + VPI", value: 390, icon: Building2, color: "bg-orange-500" },
  {
    label: "Webinar",
    value: 560,
    icon: Globe,
    color: "bg-indigo-500",
  },
];

// Monthly deliverables data (trend)
const monthlyDeliverablesData = [
  { month: "Jan", CS: 45, MQL: 28, HQL: 15, BANT: 8, Webinar: 12 },
  { month: "Feb", CS: 52, MQL: 31, HQL: 18, BANT: 9, Webinar: 14 },
  { month: "Mar", CS: 48, MQL: 29, HQL: 16, BANT: 7, Webinar: 13 },
  { month: "Apr", CS: 55, MQL: 34, HQL: 19, BANT: 11, Webinar: 15 },
  { month: "May", CS: 49, MQL: 32, HQL: 17, BANT: 8, Webinar: 12 },
];

// Deliverables by geo (Monthly vs Quarterly snapshot)
const geoDeliverableDataMonthly = [
  { geo: "India", CS: 22, MQL: 16, HQL: 12, BANT: 7, Webinar: 10 },
  { geo: "Singapore", CS: 24, MQL: 18, HQL: 16, BANT: 9, Webinar: 12 },
  { geo: "South Africa", CS: 20, MQL: 18, HQL: 15, BANT: 8, Webinar: 11 },
  { geo: "United States", CS: 26, MQL: 22, HQL: 21, BANT: 13, Webinar: 20 },
  { geo: "Aland Islands", CS: 12, MQL: 14, HQL: 16, BANT: 15, Webinar: 18 },
];

const geoDeliverableDataQuarterly = [
  { geo: "India", CS: 68, MQL: 45, HQL: 40, BANT: 22, Webinar: 30 },
  { geo: "Singapore", CS: 72, MQL: 54, HQL: 48, BANT: 27, Webinar: 36 },
  { geo: "South Africa", CS: 63, MQL: 49, HQL: 44, BANT: 24, Webinar: 33 },
  { geo: "United States", CS: 78, MQL: 66, HQL: 63, BANT: 39, Webinar: 60 },
  { geo: "Aland Islands", CS: 36, MQL: 42, HQL: 48, BANT: 45, Webinar: 54 },
];

// Location-specific job level distribution data
const jobLevelDataByLocation = {
  ALL: [
    { name: "Staff", value: 119, color: "#FF6A00" },
    { name: "Manager", value: 100, color: "#1A73E8" },
    { name: "Director", value: 54, color: "#00C48C" },
    { name: "VP/President", value: 51, color: "#9C27B0" },
    { name: "C-Level", value: 75, color: "#FF9800" },
  ],
  INDIA: [
    { name: "Staff", value: 45, color: "#FF6A00" },
    { name: "Manager", value: 38, color: "#1A73E8" },
    { name: "Director", value: 22, color: "#00C48C" },
    { name: "VP/President", value: 18, color: "#9C27B0" },
    { name: "C-Level", value: 25, color: "#FF9800" },
  ],
  SINGAPORE: [
    { name: "Staff", value: 32, color: "#FF6A00" },
    { name: "Manager", value: 28, color: "#1A73E8" },
    { name: "Director", value: 15, color: "#00C48C" },
    { name: "VP/President", value: 12, color: "#9C27B0" },
    { name: "C-Level", value: 18, color: "#FF9800" },
  ],
  SOUTH_AFRICA: [
    { name: "Staff", value: 28, color: "#FF6A00" },
    { name: "Manager", value: 22, color: "#1A73E8" },
    { name: "Director", value: 12, color: "#00C48C" },
    { name: "VP/President", value: 8, color: "#9C27B0" },
    { name: "C-Level", value: 15, color: "#FF9800" },
  ],
  UNITED_STATES: [
    { name: "Staff", value: 85, color: "#FF6A00" },
    { name: "Manager", value: 72, color: "#1A73E8" },
    { name: "Director", value: 42, color: "#00C48C" },
    { name: "VP/President", value: 35, color: "#9C27B0" },
    { name: "C-Level", value: 48, color: "#FF9800" },
  ],
  ALAND_ISLANDS: [
    { name: "Staff", value: 12, color: "#FF6A00" },
    { name: "Manager", value: 8, color: "#1A73E8" },
    { name: "Director", value: 5, color: "#00C48C" },
    { name: "VP/President", value: 3, color: "#9C27B0" },
    { name: "C-Level", value: 7, color: "#FF9800" },
  ],
};

// Location-specific employee size data
const employeeSizeDataByLocation = {
  ALL: [
    { size: "1-10", count: 125 },
    { size: "11-50", count: 98 },
    { size: "51-200", count: 87 },
    { size: "201-500", count: 65 },
    { size: "501-1000", count: 43 },
    { size: "1000+", count: 82 },
  ],
  INDIA: [
    { size: "1-10", count: 42 },
    { size: "11-50", count: 35 },
    { size: "51-200", count: 28 },
    { size: "201-500", count: 22 },
    { size: "501-1000", count: 15 },
    { size: "1000+", count: 18 },
  ],
  SINGAPORE: [
    { size: "1-10", count: 35 },
    { size: "11-50", count: 28 },
    { size: "51-200", count: 25 },
    { size: "201-500", count: 18 },
    { size: "501-1000", count: 12 },
    { size: "1000+", count: 22 },
  ],
  SOUTH_AFRICA: [
    { size: "1-10", count: 28 },
    { size: "11-50", count: 22 },
    { size: "51-200", count: 18 },
    { size: "201-500", count: 15 },
    { size: "501-1000", count: 8 },
    { size: "1000+", count: 12 },
  ],
  UNITED_STATES: [
    { size: "1-10", count: 95 },
    { size: "11-50", count: 75 },
    { size: "51-200", count: 68 },
    { size: "201-500", count: 52 },
    { size: "501-1000", count: 35 },
    { size: "1000+", count: 65 },
  ],
  ALAND_ISLANDS: [
    { size: "1-10", count: 8 },
    { size: "11-50", count: 6 },
    { size: "51-200", count: 5 },
    { size: "201-500", count: 4 },
    { size: "501-1000", count: 2 },
    { size: "1000+", count: 3 },
  ],
};

// Industry data by location
const industryDataByLocation: Record<
  string,
  { industry: string; count: number }[]
> = {
  ALL: [
    { industry: "Technology", count: 156 },
    { industry: "Healthcare", count: 89 },
    { industry: "Finance", count: 76 },
    { industry: "Manufacturing", count: 65 },
    { industry: "Education", count: 54 },
    { industry: "Retail", count: 43 },
    { industry: "Other", count: 67 },
  ],
  INDIA: [
    { industry: "Technology", count: 45 },
    { industry: "Healthcare", count: 24 },
    { industry: "Finance", count: 22 },
    { industry: "Manufacturing", count: 18 },
    { industry: "Education", count: 15 },
    { industry: "Retail", count: 12 },
    { industry: "Other", count: 14 },
  ],
  SINGAPORE: [
    { industry: "Technology", count: 38 },
    { industry: "Healthcare", count: 20 },
    { industry: "Finance", count: 19 },
    { industry: "Manufacturing", count: 16 },
    { industry: "Education", count: 13 },
    { industry: "Retail", count: 11 },
    { industry: "Other", count: 12 },
  ],
  SOUTH_AFRICA: [
    { industry: "Technology", count: 28 },
    { industry: "Healthcare", count: 18 },
    { industry: "Finance", count: 14 },
    { industry: "Manufacturing", count: 12 },
    { industry: "Education", count: 9 },
    { industry: "Retail", count: 8 },
    { industry: "Other", count: 10 },
  ],
  UNITED_STATES: [
    { industry: "Technology", count: 85 },
    { industry: "Healthcare", count: 48 },
    { industry: "Finance", count: 42 },
    { industry: "Manufacturing", count: 35 },
    { industry: "Education", count: 30 },
    { industry: "Retail", count: 25 },
    { industry: "Other", count: 31 },
  ],
  ALAND_ISLANDS: [
    { industry: "Technology", count: 12 },
    { industry: "Healthcare", count: 7 },
    { industry: "Finance", count: 6 },
    { industry: "Manufacturing", count: 5 },
    { industry: "Education", count: 4 },
    { industry: "Retail", count: 3 },
    { industry: "Other", count: 4 },
  ],
};

const COLORS = ["#FF6A00", "#1A73E8", "#00C48C", "#9C27B0", "#FF9800"];

export default function CampaignOverview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("deliverables");
  const [viewMode, setViewMode] = useState<"chart" | "table">("table");
  const [selectedGeoLocation, setSelectedGeoLocation] = useState("ALL");
  const [deliverablePeriod, setDeliverablePeriod] = useState<
    "monthly" | "quarterly"
  >("monthly");

  // Campaign acceptance state
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<{
    cs: boolean;
    mql: boolean;
    hql: boolean;
    bantVpi: boolean;
    webinar: boolean;
  }>({
    cs: false,
    mql: false,
    hql: false,
    bantVpi: false,
    webinar: false,
  });
  const [campaignCounts, setCampaignCounts] = useState({
    cs: 150,
    mql: 120,
    hql: 90,
    bantVpi: 60,
    webinar: 45,
  });
  const geoTableLocations = [
    "INDIA",
    "SINGAPORE",
    "SOUTH_AFRICA",
    "UNITED_STATES",
    "ALAND_ISLANDS",
  ] as const;

  // Derived tables for Database Reach (rows as categories, columns as locations)
  const jobLevelCategories = jobLevelDataByLocation.ALL.map((j) => j.name);
  const jobLevelMatrix = jobLevelCategories.map((cat) => {
    const row: Record<string, number | string> = { job: cat };
    geoTableLocations.forEach((loc) => {
      const entry = jobLevelDataByLocation[loc].find((x) => x.name === cat);
      row[loc] = entry ? entry.value : 0;
    });
    return row;
  });

  const employeeSizeCategories = employeeSizeDataByLocation.ALL.map(
    (e) => e.size,
  );
  const employeeSizeMatrix = employeeSizeCategories.map((size) => {
    const row: Record<string, number | string> = { size };
    geoTableLocations.forEach((loc) => {
      const entry = employeeSizeDataByLocation[loc].find(
        (x) => x.size === size,
      );
      row[loc] = entry ? entry.count : 0;
    });
    return row;
  });

  const industryCategories = industryDataByLocation.ALL.map((i) => i.industry);
  const industryMatrix = industryCategories.map((ind) => {
    const row: Record<string, number | string> = { industry: ind };
    geoTableLocations.forEach((loc) => {
      const entry = industryDataByLocation[loc].find((x) => x.industry === ind);
      row[loc] = entry ? entry.count : 0;
    });
    return row;
  });

  // Filter pie/bar based on selected geo
  const filteredJobLevelData = useMemo(() => {
    return (
      jobLevelDataByLocation[
        selectedGeoLocation as keyof typeof jobLevelDataByLocation
      ] || jobLevelDataByLocation.ALL
    );
  }, [selectedGeoLocation]);

  const filteredEmployeeSizeData = useMemo(() => {
    return (
      employeeSizeDataByLocation[
        selectedGeoLocation as keyof typeof employeeSizeDataByLocation
      ] || employeeSizeDataByLocation.ALL
    );
  }, [selectedGeoLocation]);

  const filteredIndustryData = useMemo(() => {
    return (
      industryDataByLocation[
        selectedGeoLocation as keyof typeof industryDataByLocation
      ] || industryDataByLocation.ALL
    );
  }, [selectedGeoLocation]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleBackToCampaigns = () => {
    navigate("/build-my-campaign?tab=requests");
  };

  const handleAcceptCampaign = () => {
    // Here you would typically call an API to accept the campaign with the counts
    console.log("Campaign accepted with counts:", campaignCounts);
    setIsAcceptModalOpen(false);
    toast.success("Campaign accepted successfully!", {
      description: `CS: ${campaignCounts.cs}, MQL: ${campaignCounts.mql}, HQL: ${campaignCounts.hql}, BANT+VPI: ${campaignCounts.bantVpi}, Webinar: ${campaignCounts.webinar}`,
    });
  };

  const handleDeclineCampaign = () => {
    // Here you would typically call an API to decline the campaign
    console.log("Campaign declined");
    toast.error("Campaign declined", {
      description: "You declined to accept this campaign.",
    });
    navigate("/build-my-campaign?tab=requests");
  };

  const handleCountChange = (field: keyof typeof campaignCounts, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setCampaignCounts((prev) => ({
      ...prev,
      [field]: Math.max(0, numValue),
    }));
  };

  const toggleLeadSelection = (field: keyof typeof selectedLeads) => {
    setSelectedLeads((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const deliverableGeoData =
    deliverablePeriod === "monthly"
      ? geoDeliverableDataMonthly
      : geoDeliverableDataQuarterly;

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-28 md:pb-32">
        {/* Back Button + KPIs */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToCampaigns}
            className="text-valasys-orange hover:bg-valasys-orange hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaign Requests
          </Button>
          <div className="w-full sm:w-auto sm:ml-auto">
            <FloatingStatsWidget
              stats={[
                {
                  label: "CS",
                  value: kpiData[0].value.toLocaleString(),
                  color: "blue",
                },
                {
                  label: "MQL",
                  value: kpiData[1].value.toLocaleString(),
                  color: "green",
                },
                {
                  label: "HQL",
                  value: kpiData[2].value.toLocaleString(),
                  color: "purple",
                },
                {
                  label: "BANT + VPI",
                  value: kpiData[3].value.toLocaleString(),
                  color: "amber",
                },
                {
                  label: "Webinar",
                  value: kpiData[4].value.toLocaleString(),
                  color: "blue",
                },
              ]}
              className="sm:flex-row"
            />
          </div>
        </div>

        {/* Header Section */}
        <Card className="border-l-4 border-l-valasys-orange">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-valasys-gray-900">
                    {campaignData.name}
                  </h1>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    {campaignData.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={campaignData.assignedTeamMember.avatar}
                      />
                      <AvatarFallback className="text-xs">
                        {campaignData.assignedTeamMember.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      Assigned to {campaignData.assignedTeamMember.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Completed on{" "}
                      {new Date(
                        campaignData.completionDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Clone Campaign
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Chart/Table Toggle */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Campaign Analytics</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="view-mode" className="text-sm">
                    Chart
                  </Label>
                  <Switch
                    id="view-mode"
                    checked={viewMode === "table"}
                    onCheckedChange={(checked) =>
                      setViewMode(checked ? "table" : "chart")
                    }
                  />
                  <Label htmlFor="view-mode" className="text-sm">
                    Table
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full bg-white border border-gray-200 rounded-xl p-1 grid grid-cols-2 gap-1 shadow-sm">
                  <TabsTrigger
                    value="deliverables"
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light data-[state=active]:text-white hover:text-valasys-orange transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Deliverables
                  </TabsTrigger>
                  <TabsTrigger
                    value="database-reach"
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light data-[state=active]:text-white hover:text-valasys-orange transition-colors"
                  >
                    <Database className="w-4 h-4" />
                    Database Reach
                  </TabsTrigger>
                </TabsList>

                {/* Deliverables Tab */}
                <TabsContent value="deliverables" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Lead Counts by Location
                    </h3>
                    <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
                      <Button
                        variant={
                          deliverablePeriod === "monthly" ? "default" : "ghost"
                        }
                        className={cn(
                          "px-3",
                          deliverablePeriod === "monthly"
                            ? "bg-valasys-orange text-white"
                            : "text-valasys-gray-700",
                        )}
                        onClick={() => setDeliverablePeriod("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={
                          deliverablePeriod === "quarterly"
                            ? "default"
                            : "ghost"
                        }
                        className={cn(
                          "px-3",
                          deliverablePeriod === "quarterly"
                            ? "bg-valasys-orange text-white"
                            : "text-valasys-gray-700",
                        )}
                        onClick={() => setDeliverablePeriod("quarterly")}
                      >
                        Quarterly
                      </Button>
                    </div>
                  </div>

                  {viewMode === "chart" ? (
                    <div className="space-y-2">
                      <ResponsiveContainer width="100%" height={340}>
                        <BarChart
                          data={deliverableGeoData}
                          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="grad-cs"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#FF6A00"
                                stopOpacity={0.95}
                              />
                              <stop
                                offset="100%"
                                stopColor="#F5A243"
                                stopOpacity={0.7}
                              />
                            </linearGradient>
                            <linearGradient
                              id="grad-mql"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#1A73E8"
                                stopOpacity={0.9}
                              />
                              <stop
                                offset="100%"
                                stopColor="#64A1F2"
                                stopOpacity={0.6}
                              />
                            </linearGradient>
                            <linearGradient
                              id="grad-hql"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#00C48C"
                                stopOpacity={0.9}
                              />
                              <stop
                                offset="100%"
                                stopColor="#66E0BE"
                                stopOpacity={0.6}
                              />
                            </linearGradient>
                            <linearGradient
                              id="grad-bant"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#9C27B0"
                                stopOpacity={0.9}
                              />
                              <stop
                                offset="100%"
                                stopColor="#BA68C8"
                                stopOpacity={0.6}
                              />
                            </linearGradient>
                            <linearGradient
                              id="grad-webinar"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#FF9800"
                                stopOpacity={0.9}
                              />
                              <stop
                                offset="100%"
                                stopColor="#FFB74D"
                                stopOpacity={0.6}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="geo" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 12 }} />
                          <Bar
                            dataKey="CS"
                            fill="url(#grad-cs)"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="MQL"
                            fill="url(#grad-mql)"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="HQL"
                            fill="url(#grad-hql)"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="BANT"
                            fill="url(#grad-bant)"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="Webinar"
                            fill="url(#grad-webinar)"
                            radius={[6, 6, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white">
                            <th className="p-2 text-left border border-white/10">
                              Lead Type
                            </th>
                            {deliverableGeoData.map((g) => (
                              <th
                                key={g.geo}
                                className="p-2 text-center border border-white/10"
                              >
                                {g.geo.toUpperCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            ["CS", "MQL", "HQL", "BANT", "Webinar"] as const
                          ).map((key) => (
                            <tr
                              key={key}
                              className="transition-colors hover:bg-orange-50"
                            >
                              <td className="p-2 font-medium border border-gray-200">
                                {key}
                              </td>
                              {deliverableGeoData.map((g) => (
                                <td
                                  key={g.geo + key}
                                  className="p-2 text-center border border-gray-200"
                                >
                                  {(g as any)[key]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>

                {/* Database Reach Tab */}
                <TabsContent value="database-reach" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Database Reach</h3>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Geo:</Label>
                      <Select
                        value={selectedGeoLocation}
                        onValueChange={setSelectedGeoLocation}
                      >
                        <SelectTrigger className="w-44 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">ALL</SelectItem>
                          <SelectItem value="INDIA">INDIA</SelectItem>
                          <SelectItem value="SINGAPORE">SINGAPORE</SelectItem>
                          <SelectItem value="SOUTH_AFRICA">
                            SOUTH AFRICA
                          </SelectItem>
                          <SelectItem value="UNITED_STATES">
                            UNITED STATES
                          </SelectItem>
                          <SelectItem value="ALAND_ISLANDS">
                            ALAND ISLANDS
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Tabs defaultValue="job-level" className="w-full">
                    <TabsList className="grid grid-cols-3 max-w-xl bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
                      <TabsTrigger
                        value="job-level"
                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light data-[state=active]:text-white"
                      >
                        Job Level
                      </TabsTrigger>
                      <TabsTrigger
                        value="employee-size"
                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light data-[state=active]:text-white"
                      >
                        Employee Size
                      </TabsTrigger>
                      <TabsTrigger
                        value="industry"
                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light data-[state=active]:text-white"
                      >
                        Main Industry
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="job-level">
                      {viewMode === "chart" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Database Reach by Job Level
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={filteredJobLevelData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={120}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {filteredJobLevelData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={`url(#pie-grad-${index})`}
                                      stroke="#fff"
                                      strokeWidth={1}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                                <defs>
                                  {filteredJobLevelData.map((entry, i) => (
                                    <linearGradient
                                      id={`pie-grad-${i}`}
                                      key={i}
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor={entry.color}
                                        stopOpacity={0.95}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={entry.color}
                                        stopOpacity={0.65}
                                      />
                                    </linearGradient>
                                  ))}
                                </defs>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Employee Size Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={filteredEmployeeSizeData}>
                                <defs>
                                  <linearGradient
                                    id="grad-emp"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="#FF6A00"
                                      stopOpacity={0.95}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="#F5A243"
                                      stopOpacity={0.7}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="size" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                  dataKey="count"
                                  fill="url(#grad-emp)"
                                  radius={[8, 8, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white">
                                <th className="p-2 text-left border border-white/10">
                                  Job Level
                                </th>
                                {geoTableLocations.map((loc) => (
                                  <th
                                    key={loc}
                                    className="p-2 text-center border border-white/10"
                                  >
                                    {loc.replace("_", " ")}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {jobLevelMatrix.map((row) => (
                                <tr
                                  key={row.job as string}
                                  className="transition-colors hover:bg-orange-50"
                                >
                                  <td className="p-2 font-medium border border-gray-200">
                                    {row.job}
                                  </td>
                                  {geoTableLocations.map((loc) => (
                                    <td
                                      key={loc}
                                      className="p-2 text-center border border-gray-200"
                                    >
                                      {row[loc] as number}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="employee-size">
                      {viewMode === "chart" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Employee Size Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={filteredEmployeeSizeData}>
                                <defs>
                                  <linearGradient
                                    id="grad-emp"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="#FF6A00"
                                      stopOpacity={0.95}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="#F5A243"
                                      stopOpacity={0.7}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="size" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                  dataKey="count"
                                  fill="url(#grad-emp)"
                                  radius={[8, 8, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Industry Split
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={filteredIndustryData}
                                  dataKey="count"
                                  nameKey="industry"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={120}
                                >
                                  {filteredIndustryData.map((_, i) => (
                                    <Cell
                                      key={i}
                                      fill={`url(#ind-grad-${i})`}
                                      stroke="#fff"
                                      strokeWidth={1}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                                <defs>
                                  {filteredIndustryData.map((_, i) => (
                                    <linearGradient
                                      id={`ind-grad-${i}`}
                                      key={i}
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor={COLORS[i % COLORS.length]}
                                        stopOpacity={0.95}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={COLORS[i % COLORS.length]}
                                        stopOpacity={0.65}
                                      />
                                    </linearGradient>
                                  ))}
                                </defs>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white">
                                <th className="p-2 text-left border border-white/10">
                                  Size
                                </th>
                                {geoTableLocations.map((loc) => (
                                  <th
                                    key={loc}
                                    className="p-2 text-center border border-white/10"
                                  >
                                    {loc.replace("_", " ")}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {employeeSizeMatrix.map((row) => (
                                <tr
                                  key={row.size as string}
                                  className="transition-colors hover:bg-orange-50"
                                >
                                  <td className="p-2 font-medium border border-gray-200">
                                    {row.size}
                                  </td>
                                  {geoTableLocations.map((loc) => (
                                    <td
                                      key={loc}
                                      className="p-2 text-center border border-gray-200"
                                    >
                                      {row[loc] as number}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="industry">
                      {viewMode === "chart" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Industry Split
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={filteredIndustryData}
                                  dataKey="count"
                                  nameKey="industry"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={120}
                                >
                                  {filteredIndustryData.map((_, i) => (
                                    <Cell
                                      key={i}
                                      fill={`url(#ind-grad-${i})`}
                                      stroke="#fff"
                                      strokeWidth={1}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                                <defs>
                                  {filteredIndustryData.map((_, i) => (
                                    <linearGradient
                                      id={`ind-grad-${i}`}
                                      key={i}
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor={COLORS[i % COLORS.length]}
                                        stopOpacity={0.95}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={COLORS[i % COLORS.length]}
                                        stopOpacity={0.65}
                                      />
                                    </linearGradient>
                                  ))}
                                </defs>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Job Level
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={filteredJobLevelData}>
                                <defs>
                                  <linearGradient
                                    id="grad-job"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="#FF6A00"
                                      stopOpacity={0.95}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="#F5A243"
                                      stopOpacity={0.7}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                  dataKey="value"
                                  fill="url(#grad-job)"
                                  radius={[8, 8, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white">
                                <th className="p-2 text-left border border-white/10">
                                  Industry
                                </th>
                                {geoTableLocations.map((loc) => (
                                  <th
                                    key={loc}
                                    className="p-2 text-center border border-white/10"
                                  >
                                    {loc.replace("_", " ")}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {industryMatrix.map((row) => (
                                <tr
                                  key={row.industry as string}
                                  className="transition-colors hover:bg-orange-50"
                                >
                                  <td className="p-2 font-medium border border-gray-200">
                                    {row.industry}
                                  </td>
                                  {geoTableLocations.map((loc) => (
                                    <td
                                      key={loc}
                                      className="p-2 text-center border border-gray-200"
                                    >
                                      {row[loc] as number}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Comments Section (Fixed Bottom) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-40">
          <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-xs">
              <p className="font-medium text-valasys-gray-900">
                Admin Comments:{" "}
                <span className="font-normal text-valasys-gray-700">
                  {campaignData.adminComment}
                </span>
              </p>
              <p className="text-[11px] text-valasys-gray-600">
                Note: This campaign is already {campaignData.status}.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-sm text-red-600 hover:bg-red-50"
                onClick={handleDeclineCampaign}
              >
                Decline
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 h-8 px-4 text-sm"
                onClick={() => setIsAcceptModalOpen(true)}
              >
                Accept
              </Button>
              <Button className="bg-valasys-orange hover:bg-valasys-orange/90 rounded-full h-8 px-4 text-sm">
                <Target className="w-4 h-4 mr-2" />
                Track My Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Accept Campaign Modal */}
        <Dialog open={isAcceptModalOpen} onOpenChange={setIsAcceptModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Accept Campaign</DialogTitle>
              <DialogDescription>
                Select the lead types you want to set targets for and enter the counts.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Lead Type Selection with Checkboxes */}
              <div className="space-y-3">
                {/* CS Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="cs-checkbox"
                    checked={selectedLeads.cs}
                    onCheckedChange={() => toggleLeadSelection("cs")}
                  />
                  <Label htmlFor="cs-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">Contact Strings (CS)</span>
                  </Label>
                </div>
                {selectedLeads.cs && (
                  <div className="ml-8">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter your count"
                      value={campaignCounts.cs}
                      onChange={(e) => handleCountChange("cs", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}

                {/* MQL Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="mql-checkbox"
                    checked={selectedLeads.mql}
                    onCheckedChange={() => toggleLeadSelection("mql")}
                  />
                  <Label htmlFor="mql-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">Marketing Qualified Leads (MQL)</span>
                  </Label>
                </div>
                {selectedLeads.mql && (
                  <div className="ml-8">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter your count"
                      value={campaignCounts.mql}
                      onChange={(e) => handleCountChange("mql", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}

                {/* HQL Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="hql-checkbox"
                    checked={selectedLeads.hql}
                    onCheckedChange={() => toggleLeadSelection("hql")}
                  />
                  <Label htmlFor="hql-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">Highly Qualified Leads (HQL)</span>
                  </Label>
                </div>
                {selectedLeads.hql && (
                  <div className="ml-8">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter your count"
                      value={campaignCounts.hql}
                      onChange={(e) => handleCountChange("hql", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}

                {/* BANT + VPI Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="bant-vpi-checkbox"
                    checked={selectedLeads.bantVpi}
                    onCheckedChange={() => toggleLeadSelection("bantVpi")}
                  />
                  <Label htmlFor="bant-vpi-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">BANT + VPI</span>
                  </Label>
                </div>
                {selectedLeads.bantVpi && (
                  <div className="ml-8">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter your count"
                      value={campaignCounts.bantVpi}
                      onChange={(e) => handleCountChange("bantVpi", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}

                {/* Webinar Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="webinar-checkbox"
                    checked={selectedLeads.webinar}
                    onCheckedChange={() => toggleLeadSelection("webinar")}
                  />
                  <Label htmlFor="webinar-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">Webinar</span>
                  </Label>
                </div>
                {selectedLeads.webinar && (
                  <div className="ml-8">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter your count"
                      value={campaignCounts.webinar}
                      onChange={(e) => handleCountChange("webinar", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAcceptModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleAcceptCampaign}
              >
                Confirm & Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
