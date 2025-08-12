"use client";

import { useState } from "react";
import { Button, Card, Input, Badge } from "@/components/ui";

const DesignSystemPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "components", label: "Components" },
  ];

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Design System</h1>
              <p className="text-sm text-gray-400">
                깔끔하고 일관된 컴포넌트 라이브러리
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[var(--ds-accent-primary)] text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <Card>
              <div className="text-center py-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[var(--ds-accent-primary)] bg-clip-text text-transparent">
                  Design System
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  현대적이고 깔끔한 디자인의 컴포넌트 라이브러리
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab("components")}
                  >
                    컴포넌트 보기
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-[var(--ds-accent-primary)] rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">일관성</h3>
                  <p className="text-sm text-gray-400">
                    모든 컴포넌트가 일관된 디자인 언어를 따릅니다
                  </p>
                </div>
              </Card>

              <Card>
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-[var(--ds-success)] rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">성능</h3>
                  <p className="text-sm text-gray-400">
                    최적화된 성능과 빠른 로딩을 제공합니다
                  </p>
                </div>
              </Card>

              <Card>
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-[var(--ds-warning)] rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">접근성</h3>
                  <p className="text-sm text-gray-400">
                    웹 접근성 표준을 준수하여 모든 사용자가 이용 가능합니다
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === "components" && (
          <div className="space-y-12">
            {/* Buttons */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Buttons</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-400">
                    Variants
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-400">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-400">
                    States
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Button loading={loading} onClick={handleLoadingTest}>
                      {loading ? "Loading..." : "Click to Load"}
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cards */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Cards</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="default" padding="md">
                  <h3 className="font-medium mb-2">Default Card</h3>
                  <p className="text-gray-400 text-sm">
                    기본 카드 스타일입니다.
                  </p>
                </Card>

                <Card variant="elevated" padding="md">
                  <h3 className="font-medium mb-2">Elevated Card</h3>
                  <p className="text-gray-400 text-sm">
                    그림자가 있는 카드입니다.
                  </p>
                </Card>

                <Card variant="outlined" padding="md">
                  <h3 className="font-medium mb-2">Outlined Card</h3>
                  <p className="text-gray-400 text-sm">
                    테두리만 있는 카드입니다.
                  </p>
                </Card>
              </div>
            </Card>

            {/* Inputs */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Form Controls</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
                  <Input
                    label="이메일"
                    type="email"
                    placeholder="example@email.com"
                    helperText="유효한 이메일 주소를 입력하세요"
                  />
                  <Input
                    label="에러 상태"
                    placeholder="잘못된 입력"
                    error="필수 입력 항목입니다"
                  />
                  <Input
                    label="비활성화"
                    placeholder="비활성화된 입력"
                    disabled
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      텍스트 영역
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border bg-[rgba(255,255,255,0.05)] border-[var(--ds-border-primary)] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-primary)] focus:border-transparent"
                      rows={4}
                      placeholder="여러 줄 텍스트를 입력하세요"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Badges</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-400">
                    Status Badges
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-400">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignSystemPage;
