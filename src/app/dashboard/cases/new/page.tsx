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
      const caseData = {
        ...formData,
        products: products,
      };
      const result = await api.cases.create(caseData);
      router.push(`/dashboard/cases/${result._id}`);
    } catch (error) {
      console.error('Failed to create case:', error);
      alert('Failed to create case');
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
        label="Sex"
        type="select"
        value={formData.patient.sex}
        onChange={(e) => handleChange('patient', 'sex', e.target.value)}
        options={[
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
          { value: 'Unknown', label: 'Unknown' },
        ]}
        required
      />
      <Input
        label="Weight (kg)"
        type="number"
        value={formData.patient.weight}
        onChange={(e) =>
          handleChange('patient', 'weight', parseFloat(e.target.value))
        }
      />
      <Input
        label="Height (cm)"
        type="number"
        value={formData.patient.height}
        onChange={(e) =>
          handleChange('patient', 'height', parseFloat(e.target.value))
        }
      />
      <Input
        label="Medical History"
        type="text"
        multiline
        value={formData.patient.medicalHistory}
        onChange={(e) =>
          handleChange('patient', 'medicalHistory', e.target.value)
        }
      />
    </div>
  );

  const reactionTab = (
    <div className="space-y-4">
      <Input
        label="Verbatim Term (as reported)"
        type="text"
        value={formData.reaction.verbatimTerm}
        onChange={(e) =>
          handleChange('reaction', 'verbatimTerm', e.target.value)
        }
        required
      />
      <Input
        label="MedDRA Preferred Term"
        type="select"
        value={formData.reaction.meddraPreferredTerm}
        onChange={(e) => {
          const selected = MEDDRA_TERMS.find((t) => t.code === e.target.value);
          if (selected) {
            handleChange('reaction', 'meddraPreferredTerm', selected.term);
            handleChange('reaction', 'meddraCode', selected.code);
            handleChange('reaction', 'meddraSoc', selected.soc);
          }
        }}
        options={meddraOptions}
        required
      />
      <Input
        label="Event Outcome"
        type="select"
        value={formData.reaction.outcome}
        onChange={(e) => handleChange('reaction', 'outcome', e.target.value)}
        options={[
          { value: 'Recovered', label: 'Recovered' },
          { value: 'Recovering', label: 'Recovering' },
          { value: 'Not Recovered', label: 'Not Recovered' },
          { value: 'Recovered with Sequelae', label: 'Recovered with Sequelae' },
          { value: 'Fatal', label: 'Fatal' },
          { value: 'Unknown', label: 'Unknown' },
        ]}
        required
      />
      <Input
        label="Seriousness Criteria"
        type="text"
        multiline
        value={formData.reaction.seriousnessCriteria.join(', ')}
        onChange={(e) =>
          handleChange(
            'reaction',
            'seriousnessCriteria',
            e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s)
          )
        }
        placeholder="Enter criteria separated by commas"
      />
    </div>
  );

  const drugTab = (
    <div className="space-y-4">
      <Input
        label="Drug Name (Trade)"
        type="select"
        value={formData.drug.tradeName}
        onChange={(e) => {
          const selected = DRUGS.find((d) => d.name === e.target.value);
          if (selected) {
            handleChange('drug', 'tradeName', selected.name);
            handleChange('drug', 'activeSubstance', selected.substance);
          }
        }}
        options={drugOptions}
        required
      />
      <Input
        label="Drug Role"
        type="select"
        value={formData.drug.drugRole}
        onChange={(e) => handleChange('drug', 'drugRole', e.target.value)}
        options={[
          { value: 'Suspect', label: 'Suspect' },
          { value: 'Concomitant', label: 'Concomitant' },
          { value: 'Interacting', label: 'Interacting' },
        ]}
        required
      />
      <Input
        label="Dose"
        type="text"
        value={formData.drug.dose}
        onChange={(e) => handleChange('drug', 'dose', e.target.value)}
      />
      <Input
        label="Route of Administration"
        type="text"
        value={formData.drug.routeOfAdmin}
        onChange={(e) =>
          handleChange('drug', 'routeOfAdmin', e.target.value)
        }
      />
      <Input
        label="Causality Assessment"
        type="select"
        value={formData.drug.causality}
        onChange={(e) => handleChange('drug', 'causality', e.target.value)}
        options={[
          { value: 'Certain', label: 'Certain' },
          { value: 'Probable', label: 'Probable' },
          { value: 'Possible', label: 'Possible' },
          { value: 'Unlikely', label: 'Unlikely' },
          { value: 'Unassessable', label: 'Unassessable' },
        ]}
      />
    </div>
  );

  const narrativeTab = (
    <div className="space-y-4">
      <Input
        label="Case Narrative"
        type="text"
        multiline
        rows={6}
        value={formData.narrative.caseNarrative}
        onChange={(e) =>
          handleChange('narrative', 'caseNarrative', e.target.value)
        }
        required
      />
      <Input
        label="Lab Tests Performed"
        type="text"
        multiline
        value={formData.narrative.labTests}
        onChange={(e) =>
          handleChange('narrative', 'labTests', e.target.value)
        }
      />
    </div>
  );

  const reporterTab = (
    <div className="space-y-4">
      <Input
        label="Reporter Name"
        type="text"
        value={formData.reporter.name}
        onChange={(e) => handleChange('reporter', 'name', e.target.value)}
        required
      />
      <Input
        label="Qualification"
        type="select"
        value={formData.reporter.qualification}
        onChange={(e) =>
          handleChange('reporter', 'qualification', e.target.value)
        }
        options={[
          { value: 'Physician', label: 'Physician' },
          { value: 'Pharmacist', label: 'Pharmacist' },
          { value: 'Nurse', label: 'Nurse' },
          { value: 'Consumer', label: 'Consumer' },
          { value: 'Other', label: 'Other' },
        ]}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.reporter.email}
        onChange={(e) => handleChange('reporter', 'email', e.target.value)}
      />
      <Input
        label="Phone"
        type="tel"
        value={formData.reporter.phone}
        onChange={(e) => handleChange('reporter', 'phone', e.target.value)}
      />
    </div>
  );

  const tabs = [
    { id: 'admin', label: 'Administration', content: administrationTab },
    { id: 'patient', label: 'Patient', content: patientTab },
    { id: 'reaction', label: 'Reaction/Event', content: reactionTab },
    { id: 'drug', label: 'Drug', content: drugTab },
    { id: 'narrative', label: 'Narrative', content: narrativeTab },
    { id: 'reporter', label: 'Reporter', content: reporterTab },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Case Entry</h1>
          <p className="text-gray-600 mt-2">ICH E2B(R3) Compliant Form</p>
        </div>
        <Link href="/dashboard/cases">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>

      <Card>
        <Tabs
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            content: (
              <div className="space-y-6">
                {tab.content}
                <div className="flex justify-between gap-4">
                  {tabs.findIndex((t) => t.id === activeTab) > 0 && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const prevIdx =
                          tabs.findIndex((t) => t.id === activeTab) - 1;
                        setActiveTab(tabs[prevIdx].id);
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {tabs.findIndex((t) => t.id === activeTab) < tabs.length - 1 && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        const nextIdx =
                          tabs.findIndex((t) => t.id === activeTab) + 1;
                        setActiveTab(tabs[nextIdx].id);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            ),
          }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6 pt-6 border-t border-gray-300 flex gap-4">
          <Button variant="secondary">Save as Draft</Button>
          <Button
            variant="primary"
            onClick={(e: any) => handleSubmit(e, false)}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Case'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
