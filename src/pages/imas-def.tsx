import React, { useState, useMemo, useRef, useEffect } from 'react'
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
  mismatchCount: number
}

const ImasDef: React.FC = () => {
  const [listOpt, setListOpt] = useState('recommand')
  const [chars, setChars] = useState<string[]>([])
  const tagsInputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    tagsInputRef.current?.focus() // autoFocus 시 style이 적용되지 않음
  }, [tagsInputRef])

  const showData = useMemo<ScoredDataUnit[]>(() => {
    if (chars.length === 0) return data

    const scored = (data as DataUnit[]).map(dataUnit => {
      const mismatchCount =
        dataUnit.chars.length -
        dataUnit.chars.filter(dataChar =>
          chars.some(char => dataChar.includes(char))
        ).length

      return {
        ...dataUnit,
        mismatchCount,
      } as ScoredDataUnit
    })

    if (listOpt === 'all') {
      return scored
    } else {
      return scored.filter(
        dataUnit => dataUnit.chars.length !== dataUnit.mismatchCount
      )
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
            추천은 일치하는 목록만 표시합니다.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>보유 캐릭터</Form.Label>
          <TagsInput
            value={chars}
            onChange={setChars}
            focusedClassName="tagsInputFocus"
            inputProps={{
              ref: tagsInputRef,
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
                    (d1.mismatchCount - d2.mismatchCount) * 100000 +
                    (d2.income - d1.income)
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
