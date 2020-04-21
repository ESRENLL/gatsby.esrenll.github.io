import React, { useState, useMemo } from 'react'
import { Form, Table } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'

import Layout from '../components/layout'
import SEO from '../components/seo'

import 'react-tagsinput/react-tagsinput.css'
import './imas-def.css'

import data from '../data/imas-def.json'

interface DataUnit {
  id: number
  chars: string[]
  income: number
}

interface ScoredDataUnit extends DataUnit {
  score: number
}

const ImasDef: React.FC = () => {
  const [listOpt, setListOpt] = useState<string>('all')
  const [chars, setChars] = useState<string[]>([])

  const showData = useMemo<ScoredDataUnit[]>(() => {
    if (chars.length === 0) return data

    const scored = (data as DataUnit[]).map(dataUnit => {
      const score = dataUnit.chars.filter(dataChar =>
        chars.some(char => dataChar.includes(char))
      ).length
      return {
        ...dataUnit,
        score,
      } as ScoredDataUnit
    })
    const filtered = scored.filter(dataUnit => dataUnit.score > 0)

    if (listOpt === 'all') {
      return filtered
    } else {
      return filtered.slice(0, 100)
    }
  }, [listOpt, chars])

  return (
    <Layout>
      <SEO title="Imas defense tool" />
      <Form>
        <Form.Group>
          <Form.Label>노출 방식</Form.Label>
          <Form.Control
            as="select"
            value={listOpt}
            onChange={e => setListOpt((e.target as HTMLSelectElement).value)}
          >
            <option value="recommand">추천</option>
            <option value="all">전체</option>
          </Form.Control>
          <Form.Text className="text-muted">
            추천은 일부 목록만 표시합니다. (미구현)
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>보유 캐릭터</Form.Label>
          <TagsInput
            value={chars}
            onChange={setChars}
            focusedClassName="tagsInputFocus"
            inputProps={{
              placeholder: '캐릭터 이름을 엔터로 입력하세요.',
              autoFocus: true,
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>유닛 편성</Form.Label>
          <Table hover>
            <thead>
              <tr>
                <th>#1</th>
                <th>#2</th>
                <th>#3</th>
                <th>#4</th>
                <th>#5</th>
                <th>월급</th>
              </tr>
            </thead>
            <tbody>
              {showData
                .sort(
                  (d1, d2) =>
                    (d2.score - d1.score) * 100000 + (d2.income - d1.income)
                )
                .map(({ id, chars: showChars, income }) => (
                  <tr key={id}>
                    {showChars.map((showChar, i) =>
                      chars.some(char => showChar.includes(char)) ? (
                        <td className="foundChar" key={i}>
                          {showChar}
                        </td>
                      ) : (
                        <td key={i}>{showChar}</td>
                      )
                    )}
                    <td>{income}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Form.Group>
      </Form>
    </Layout>
  )
}

export default ImasDef
