import React from 'react';
import { formatCredentialUrl } from '../utills/url_helper';

const CertificationCard = ({ certification }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-xl font-semibold">{certification.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {certification.issuer} — {new Date(certification.issueDate).toLocaleDateString()}
      </p>
      {certification.expirationDate && (
        <p>Expires: {new Date(certification.expirationDate).toLocaleDateString()}</p>
      )}
      {certification.credentialID && <p>ID: {certification.credentialID}</p>}
      {certification.credentialURL && (
        <a
          href={
            certification.urlType === 'params'
              ? certification.credentialURL
              : formatCredentialUrl(certification.credentialURL, certification.urlType)
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Verify Credential
        </a>
      )}
      {certification.description && <p className="mt-2">{certification.description}</p>}
    </div>
  );
};

export default CertificationCard;