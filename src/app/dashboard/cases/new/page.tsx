'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';

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
        primaryReporterType: 'Student',
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
        narrative: formData.narrative || 'Case entry in progress',
        reporter: {
          name: 'Student',
          qualification: 'Safety Analyst',
          country: formData.countryOfOccurrence,
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
      className={`px-3 py-1 text-11 font-bold border-b-2 transition-colors ${
        activeTab === id
          ? 'bg-argus-bg-tab-active text-argus-navy border-b-argus-section'
          : 'bg-argus-bg-tab-inactive text-argus-text-muted border-b-argus-border hover:bg-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-13 font-bold text-argus-navy">
            NEW CASE ENTRY
          </div>
          <button
            onClick={() => router.back()}
            className="px-2 py-1 bg-argus-bg-tab-inactive hover:bg-argus-blue text-argus-text-primary text-10 border border-argus-border"
          >
            Cancel
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-2 border-argus-border bg-white">
          <div className="bg-argus-bg-tab-inactive border-b border-argus-border flex">
            <TabButton id="general" label="General" />
            <TabButton id="patient" label="Patient" />
            <TabButton id="products" label="Products" />
            <TabButton id="events" label="Events / Reactions" />
            <TabButton id="analysis" label="Analysis" />
            <TabButton id="narrative" label="Narrative" />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-3 space-y-2">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
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

                <div className="grid grid-cols-2 gap-3">
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

                <div className="grid grid-cols-2 gap-3">
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
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

                <button
                  type="button"
                  onClick={addProduct}
                  className="px-3 py-1 bg-argus-blue text-white text-10 font-bold border border-argus-border-dark hover:bg-argus-light"
                >
                  ➕ Add Another Product
                </button>
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
              <div className="space-y-3 bg-argus-bg-row-alt p-3 border border-argus-border">
                <p className="text-10 text-argus-text-muted italic">
                  WHO-UMC Causality Assessment: Assessed during case review. Not available for new cases.
                </p>
                <p className="text-10 font-bold text-argus-navy">
                  Causality: <span className="text-argus-text-muted">Not Yet Assessed</span>
                </p>
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
                className="px-3 py-1 bg-argus-bg-tab-inactive text-argus-text-primary text-10 font-bold border border-argus-border hover:bg-white"
              >
                Save as Draft
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
