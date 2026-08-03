"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/Button';
import IconSave from '@/components/icons/Save';
import IconCheck from '@/components/icons/Check';
import IconArrowLeft from '@/components/icons/ArrowLeft';
import IconPlus from '@/components/icons/Plus';

export default function NewCasePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    caseNumber: '',
    receiptDate: new Date().toISOString().split('T')[0],
    caseClassification: 'Spontaneous',
    reportType: 'Initial',
    countryOfOccurrence: 'USA',
    awarenessDate: new Date().toISOString().split('T')[0],
    reporterType: 'Physician',
    reporterName: '',
    reporterQualification: '',
    reporterInstitution: '',
    reporterCity: '',
    reporterPhone: '',
    reporterEmail: '',
    reportSourceChannel: 'Phone',
    reportSourceDocument: '',
    isPregnancyCase: false,
    patient: {
      initials: '',
      age: '',
      sex: 'Unknown',
      weight: '',
      height: '',
    },
    products: [
      {
        productName: '',
        activeSubstance: '',
        drugRole: 'Suspect',
        dose: '',
        doseUnit: 'mg',
        routeOfAdmin: 'Oral',
        startDate: '',
        indication: '',
      },
    ],
    reaction: {
      reactionName: '',
      onsetDate: '',
      outcome: 'Unknown',
      seriousness: 'Not Serious',
    },
    analysis: {
      whoCausality: 'Possible',
      companyCausality: 'Possible',
      listedness: 'Unknown',
      comments: '',
    },
    narrative: '',
  });

  const [products, setProducts] = useState([{ ...formData.products[0] }]);
  const [requiredFields, setRequiredFields] = useState<Set<string>>(new Set());

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (value) {
      setRequiredFields((prev) => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productName: '',
        activeSubstance: '',
        drugRole: 'Suspect',
        dose: '',
        doseUnit: 'mg',
        routeOfAdmin: 'Oral',
        startDate: '',
        indication: '',
      },
    ]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleAnalysisChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      analysis: {
        ...formData.analysis,
        [field]: value,
      },
    });
  };

  const handleSaveDraft = async () => {
    setLoading(true);

    try {
      // Prepare case data with all required fields
      const caseData = {
        caseNumber: formData.caseNumber || `ARG-${Date.now()}`,
        receiptDate: formData.receiptDate,
        caseClassification: formData.caseClassification,
        reportType: formData.reportType,
        countryOfOccurrence: formData.countryOfOccurrence,
        awarenessDate: formData.awarenessDate,
        primaryReporterType: formData.reporterType,
        isPregnancyCase: formData.isPregnancyCase,
        patient: {
          initials: formData.patient.initials || 'NA',
          age: formData.patient.age || 0,
          sex: formData.patient.sex || 'Unknown',
          weight: formData.patient.weight,
          height: formData.patient.height,
          medicalHistory: formData.patient.medicalHistory,
        },
        products: products.length > 0 ? products : [{
          productName: 'Unknown',
          activeSubstance: 'Unknown',
          drugRole: 'Suspect',
        }],
        reaction: {
          reactionName: formData.reaction.reactionName || 'Unknown',
          onsetDate: formData.reaction.onsetDate,
          outcome: formData.reaction.outcome,
          seriousness: formData.reaction.seriousness,
        },
        analysis: {
          whoCausality: formData.analysis.whoCausality,
          companyCausality: formData.analysis.companyCausality,
          listedness: formData.analysis.listedness,
          comments: formData.analysis.comments,
        },
        narrative: formData.narrative || 'Case entry in progress',
        reporter: {
          type: formData.reporterType,
          name: formData.reporterName || 'Unknown',
          qualification: formData.reporterQualification || 'Unknown',
          institution: formData.reporterInstitution,
          city: formData.reporterCity,
          country: formData.countryOfOccurrence,
          phone: formData.reporterPhone,
          email: formData.reporterEmail,
          sourceChannel: formData.reportSourceChannel,
          sourceDocument: formData.reportSourceDocument,
        },
      };

      const result = await api.cases.create(caseData);
      
      if (result && result._id) {
        window.alert(`✓ Case saved as draft: ${result.caseId || result._id}`);
        router.push(`/dashboard/cases/${result._id}`);
      } else if (result && result.caseId) {
        window.alert(`✓ Case saved as draft: ${result.caseId}`);
        router.push(`/dashboard/cases`);
      } else {
        window.alert('✓ Case saved as draft');
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      console.error('Failed to save draft:', error);
      const errorMsg = error?.message || 'Unknown error occurred';
      window.alert(`✗ Failed to save draft:\n${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare case data with all required fields
      const caseData = {
        caseNumber: formData.caseNumber || `ARG-${Date.now()}`,
        receiptDate: formData.receiptDate,
        caseClassification: formData.caseClassification,
        reportType: formData.reportType,
        countryOfOccurrence: formData.countryOfOccurrence,
        awarenessDate: formData.awarenessDate,
        primaryReporterType: formData.reporterType,
        isPregnancyCase: formData.isPregnancyCase,
        patient: {
          initials: formData.patient.initials || 'NA',
          age: formData.patient.age || 0,
          sex: formData.patient.sex || 'Unknown',
          weight: formData.patient.weight,
          height: formData.patient.height,
          medicalHistory: formData.patient.medicalHistory,
        },
        products: products.length > 0 ? products : [{
          productName: 'Unknown',
          activeSubstance: 'Unknown',
          drugRole: 'Suspect',
        }],
        reaction: {
          reactionName: formData.reaction.reactionName || 'Unknown',
          onsetDate: formData.reaction.onsetDate,
          outcome: formData.reaction.outcome,
          seriousness: formData.reaction.seriousness,
        },
        analysis: {
          whoCausality: formData.analysis.whoCausality,
          companyCausality: formData.analysis.companyCausality,
          listedness: formData.analysis.listedness,
          comments: formData.analysis.comments,
        },
        narrative: formData.narrative || 'Case entry in progress',
        reporter: {
          type: formData.reporterType,
          name: formData.reporterName || 'Unknown',
          qualification: formData.reporterQualification || 'Unknown',
          institution: formData.reporterInstitution,
          city: formData.reporterCity,
          country: formData.countryOfOccurrence,
          phone: formData.reporterPhone,
          email: formData.reporterEmail,
          sourceChannel: formData.reportSourceChannel,
          sourceDocument: formData.reportSourceDocument,
        },
      };

      const result = await api.cases.create(caseData);
      
      if (result && result._id) {
        // Success - navigate to case details
        window.alert(`✓ Case created successfully: ${result.caseId || result._id}`);
        router.push(`/dashboard/cases/${result._id}`);
      } else if (result && result.caseId) {
        window.alert(`✓ Case created successfully: ${result.caseId}`);
        router.push(`/dashboard/cases`);
      } else {
        window.alert('✓ Case created successfully');
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      console.error('Failed to create case:', error);
      const errorMsg = error?.message || 'Unknown error occurred';
      window.alert(`✗ Failed to create case:\n${errorMsg}\n\nPlease check that all required fields are filled.`);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-2 py-1 text-xs font-semibold transition-colors mr-1 ${
        activeTab === id
          ? 'bg-[color:var(--argus-classic-tab)] text-argus-navy border-b-0'
          : 'text-argus-text-muted hover:text-argus-navy hover:bg-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <ArgusLayout>
      <div className="space-y-4">
        <PageHeader
          title="New Case Entry"
          description="Create or save case drafts quickly. Fields marked * are required."
          actions={(
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={<IconArrowLeft />} onClick={() => router.back()}>Cancel</Button>
              <Button variant="secondary" size="sm" icon={<IconSave />} onClick={handleSaveDraft}>Save</Button>
              <Button type="submit" form="case-form" variant="primary" size="sm" icon={<IconCheck />}>Submit</Button>
            </div>
          )}
        />

        <div className="bg-white border border-argus-border rounded-lg overflow-hidden">
          <div className="flex bg-argus-bg px-2"> 
            <TabButton id="general" label="General" />
            <TabButton id="patient" label="Patient" />
            <TabButton id="products" label="Products" />
            <TabButton id="events" label="Events / Reactions" />
            <TabButton id="analysis" label="Analysis" />
            <TabButton id="narrative" label="Narrative" />
          </div>

          {/* Form Content */}
          <form id="case-form" onSubmit={handleSubmit} className="p-2 space-y-3">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">
                      Case Number: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.caseNumber}
                      onChange={(e) => handleChange('caseNumber', e.target.value)}
                      placeholder="ARG-0001234"
                      className={`w-full px-2 py-1 border text-10 focus:outline-none ${
                        requiredFields.has('caseNumber') ? 'border-red-600 bg-red-50' : 'border-argus-border focus:border-argus-light'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">
                      Receipt Date: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.receiptDate}
                      onChange={(e) => handleChange('receiptDate', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Case Classification:</label>
                    <select
                      value={formData.caseClassification}
                      onChange={(e) => handleChange('caseClassification', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Spontaneous">Spontaneous</option>
                      <option value="Literature">Literature</option>
                      <option value="Clinical Trial">Clinical Trial</option>
                      <option value="Solicited">Solicited</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Report Type:</label>
                    <select
                      value={formData.reportType}
                      onChange={(e) => handleChange('reportType', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Initial">Initial</option>
                      <option value="Follow-up">Follow-up</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Country of Occurrence:</label>
                    <select
                      value={formData.countryOfOccurrence}
                      onChange={(e) => handleChange('countryOfOccurrence', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      <option value="EU">EU</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center text-10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPregnancyCase}
                        onChange={(e) => handleChange('isPregnancyCase', e.target.checked)}
                        className="mr-2 cursor-pointer"
                      />
                      <span className="font-bold">Pregnancy Case</span>
                    </label>
                  </div>
                </div>

                  <div className="border-t border-argus-border pt-2">
                  <div className="text-11 font-bold text-argus-navy mb-1">Report Source / Reporter Details</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Awareness Date:</label>
                      <input
                        type="date"
                        value={formData.awarenessDate}
                        onChange={(e) => handleChange('awarenessDate', e.target.value)}
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Report Source Channel:</label>
                      <select
                        value={formData.reportSourceChannel}
                        onChange={(e) => handleChange('reportSourceChannel', e.target.value)}
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                      >
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="Portal">Portal</option>
                        <option value="Fax">Fax</option>
                        <option value="Letter">Letter</option>
                        <option value="Literature">Literature</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Source Document / Ref:</label>
                      <input
                        type="text"
                        value={formData.reportSourceDocument}
                        onChange={(e) => handleChange('reportSourceDocument', e.target.value)}
                        placeholder="e.g. RA-2026-01"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Reporter Type:</label>
                      <select
                        value={formData.reporterType}
                        onChange={(e) => handleChange('reporterType', e.target.value)}
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                      >
                        <option value="Physician">Physician</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Patient">Patient</option>
                        <option value="Clinical Investigator">Clinical Investigator</option>
                        <option value="Other Healthcare Provider">Other Healthcare Provider</option>
                        <option value="Non-Professional">Non-Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Reporter Name:</label>
                      <input
                        type="text"
                        value={formData.reporterName}
                        onChange={(e) => handleChange('reporterName', e.target.value)}
                        placeholder="Dr. Jane Doe"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Qualification:</label>
                      <input
                        type="text"
                        value={formData.reporterQualification}
                        onChange={(e) => handleChange('reporterQualification', e.target.value)}
                        placeholder="MD / Pharmacist"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Institution:</label>
                      <input
                        type="text"
                        value={formData.reporterInstitution}
                        onChange={(e) => handleChange('reporterInstitution', e.target.value)}
                        placeholder="City Hospital"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">City:</label>
                      <input
                        type="text"
                        value={formData.reporterCity}
                        onChange={(e) => handleChange('reporterCity', e.target.value)}
                        placeholder="New York"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Phone:</label>
                      <input
                        type="tel"
                        value={formData.reporterPhone}
                        onChange={(e) => handleChange('reporterPhone', e.target.value)}
                        placeholder="+1 555 123 4567"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-10 font-bold text-argus-text-label mb-1">Email:</label>
                      <input
                        type="email"
                        value={formData.reporterEmail}
                        onChange={(e) => handleChange('reporterEmail', e.target.value)}
                        placeholder="reporter@example.com"
                        className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Patient Tab */}
            {activeTab === 'patient' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Initials:</label>
                    <input
                      type="text"
                      value={formData.patient.initials}
                      onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, initials: e.target.value } })}
                      placeholder="ABC"
                      maxLength={3}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Age:</label>
                    <input
                      type="number"
                      value={formData.patient.age}
                      onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, age: e.target.value } })}
                      placeholder="0"
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Sex:</label>
                    <select
                      value={formData.patient.sex}
                      onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, sex: e.target.value } })}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Weight (kg):</label>
                    <input
                      type="number"
                      value={formData.patient.weight}
                      onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, weight: e.target.value } })}
                      placeholder="0"
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Height (cm):</label>
                    <input
                      type="number"
                      value={formData.patient.height}
                      onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, height: e.target.value } })}
                      placeholder="0"
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-2">
                {products.map((product, idx) => (
                  <div key={idx} className="border border-argus-border bg-argus-bg p-2 mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-10 font-bold text-argus-navy">PRODUCT #{idx + 1}</span>
                      {products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(idx)}
                          className="px-2 py-0 bg-red-600 text-white text-9 border border-red-700 hover:bg-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-10">
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Product Name: <span className="text-red-600">*</span></label>
                        <input
                          type="text"
                          value={product.productName}
                          onChange={(e) => handleProductChange(idx, 'productName', e.target.value)}
                          placeholder="Product name"
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Active Substance:</label>
                        <input
                          type="text"
                          value={product.activeSubstance}
                          onChange={(e) => handleProductChange(idx, 'activeSubstance', e.target.value)}
                          placeholder="e.g., Ibuprofen"
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Drug Role:</label>
                        <select
                          value={product.drugRole}
                          onChange={(e) => handleProductChange(idx, 'drugRole', e.target.value)}
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                        >
                          <option value="Suspect">Suspect</option>
                          <option value="Concomitant">Concomitant</option>
                          <option value="Interacting">Interacting</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Dose:</label>
                        <input
                          type="text"
                          value={product.dose}
                          onChange={(e) => handleProductChange(idx, 'dose', e.target.value)}
                          placeholder="e.g., 100"
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Route of Admin:</label>
                        <select
                          value={product.routeOfAdmin}
                          onChange={(e) => handleProductChange(idx, 'routeOfAdmin', e.target.value)}
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                        >
                          <option value="Oral">Oral</option>
                          <option value="IV">IV</option>
                          <option value="IM">IM</option>
                          <option value="SC">SC</option>
                          <option value="Topical">Topical</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-argus-text-label mb-0.5">Start Date:</label>
                        <input
                          type="date"
                          value={product.startDate}
                          onChange={(e) => handleProductChange(idx, 'startDate', e.target.value)}
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-bold text-argus-text-label mb-0.5">Indication:</label>
                        <input
                          type="text"
                          value={product.indication}
                          onChange={(e) => handleProductChange(idx, 'indication', e.target.value)}
                          placeholder="e.g., Pain relief"
                          className="w-full px-1 py-0.5 border border-argus-border text-9 focus:border-argus-light focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" size="sm" variant="primary" icon={<IconPlus />} onClick={addProduct}>
                  Add Another Product
                </Button>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">
                    Reaction/Event Name: <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.reaction.reactionName}
                    onChange={(e) => setFormData({ ...formData, reaction: { ...formData.reaction, reactionName: e.target.value } })}
                    placeholder="e.g., Nausea, Headache"
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Onset Date:</label>
                    <input
                      type="date"
                      value={formData.reaction.onsetDate}
                      onChange={(e) => setFormData({ ...formData, reaction: { ...formData.reaction, onsetDate: e.target.value } })}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Outcome:</label>
                    <select
                      value={formData.reaction.outcome}
                      onChange={(e) => setFormData({ ...formData, reaction: { ...formData.reaction, outcome: e.target.value } })}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Recovered">Recovered</option>
                      <option value="Recovering">Recovering</option>
                      <option value="Not Recovered">Not Recovered</option>
                      <option value="Fatal">Fatal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Seriousness:</label>
                    <select
                      value={formData.reaction.seriousness}
                      onChange={(e) => setFormData({ ...formData, reaction: { ...formData.reaction, seriousness: e.target.value } })}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Not Serious">Not Serious</option>
                      <option value="Serious">Serious</option>
                      <option value="Serious - Death">Serious - Death</option>
                      <option value="Serious - Hospitalization">Serious - Hospitalization</option>
                      <option value="Serious - Disability">Serious - Disability</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Tab */}
            {activeTab === 'analysis' && (
              <div className="space-y-3 p-3 border border-argus-border bg-white">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">WHO-UMC Causality:</label>
                    <select
                      value={formData.analysis.whoCausality}
                      onChange={(e) => handleAnalysisChange('whoCausality', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Certain">Certain</option>
                      <option value="Probable">Probable</option>
                      <option value="Possible">Possible</option>
                      <option value="Unlikely">Unlikely</option>
                      <option value="Conditional">Conditional</option>
                      <option value="Unassessable">Unassessable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Company Causality:</label>
                    <select
                      value={formData.analysis.companyCausality}
                      onChange={(e) => handleAnalysisChange('companyCausality', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Certain">Certain</option>
                      <option value="Probable">Probable</option>
                      <option value="Possible">Possible</option>
                      <option value="Unlikely">Unlikely</option>
                      <option value="Conditional">Conditional</option>
                      <option value="Unassessable">Unassessable</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Listedness:</label>
                    <select
                      value={formData.analysis.listedness}
                      onChange={(e) => handleAnalysisChange('listedness', e.target.value)}
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Listed">Listed</option>
                      <option value="Not Listed">Not Listed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-10 font-bold text-argus-text-label mb-1">Analysis Comments:</label>
                    <input
                      type="text"
                      value={formData.analysis.comments}
                      onChange={(e) => handleAnalysisChange('comments', e.target.value)}
                      placeholder="Enter any remarks"
                      className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Narrative Tab */}
            {activeTab === 'narrative' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">Case Narrative:</label>
                  <textarea
                    value={formData.narrative}
                    onChange={(e) => handleChange('narrative', e.target.value)}
                    placeholder="Enter case narrative and details here..."
                    rows={8}
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Form Buttons */}
            <div className="flex gap-2 pt-3 border-t border-argus-border mt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-3 py-1 bg-argus-bg-tab-inactive text-argus-text-primary text-10 font-bold border border-argus-border hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="px-3 py-1 bg-argus-bg-tab-inactive text-argus-text-primary text-10 font-bold border border-argus-border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-1 bg-argus-blue text-white text-10 font-bold border border-argus-border-dark hover:bg-argus-light disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Case'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ArgusLayout>
  );
}
